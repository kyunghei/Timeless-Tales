from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv
import helpers
from context import context


app = Flask(__name__)
CORS(app)

# **************************************************
#         API Functions
# **************************************************
# Read in API token
load_dotenv()
my_key = os.getenv("OPENAI_API_KEY")

# Check if API token exists
if my_key is None:
    print("WARNING: Unable to locate OpenAI API token\nEnsure file '.env' "
          "exists with backend app directory and token is set to variable "
          "OPENAI_API_KEY")
    exit()

# Authenticate API token
client = openai.OpenAI(api_key=my_key)


def get_story_part(prompt: str, story_history: list) -> str:
    """
    Returns story part based on input prompt

    Input: prompt (str), story_history (list)
    Output: story part (str)
    """
    if story_history:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system",
                       "content": f"Story history for "
                                  f"context: {story_history}"},
                      {"role": "user", "content": prompt}]
        )
    else:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

    story_part = completion.choices[0].message.content
    return story_part


def get_image_URL(img_prompt: str) -> str:
    """
    Returns image URL based on input prompt
    NOTE: URL expires after an hour

    Input: image prompt (str)
    Output: image URL (str)
    """
    response = client.images.generate(
        model="dall-e-3",
        prompt=img_prompt,
        size="1024x1024",
        quality="standard",
        n=1)

    img_URL = response.data[0].url
    return img_URL


# **************************************************
#         Flask Functions
# **************************************************
@app.route('/story', methods=['GET'])
def post_story_beat():
    """
    Returns data to front-end to utilize and display.
    """
    # Generate Information
    story_prompt = helpers.get_story_prompt(context)
    story_text = get_story_part(story_prompt, context.story_history)
    story_text, choice1, choice2, choice3 = helpers.split_choices(story_text)

    # Update Internal Data
    # TODO - Implment this elsewhere so all context changed in same place
    context.story_history.append(story_prompt)

    # Generate Image
    image_prompt = helpers.get_image_prompt(context)
    story_image = get_image_URL(image_prompt)

    # Return Data
    response_data = {
        'story_text': story_text,
        'choice_1': choice1,
        'choice_2': choice2,
        'choice_3': choice3,
        'story_image': story_image,
        'current_beat': context.current_beat,
        'current_lives': context.current_lives
    }
    return jsonify(response_data)


# TODO - Can this be combined with the post beat?
# Can we get data from front end, process it, then return results
# all in the same function call?
@app.route('/user_choice', methods=['POST'])
def get_next_beat():
    """
    When user moves to the next story beats:
    - Retrieves user choice
    - Iterates story context
    """
    # Get frontend paramters
    # TODO - not sure how this is stored/passed yet
    # Will either save text directly or index choice_tags if given int
    json_object = request.json
    context.user_choice = json_object.get("userChoice")

    # Update Context
    context.current_beat += 1
    context.choice_tags = helpers.get_choice_tags(context)

    # Update Lives
    for tag in context.user_choice:
        if tag == "gain_life" and context.current_lives < context.max_lives:
            context.current_lives += 1
        if tag == "lose_life":
            context.current_lives -= 1
        if context.current_lives <= 0:
            context.gameover = True
            # TODO - Remove choices entirely if frontend does not do so


@app.route('/customization', methods=['POST'])
def get_parameters():
    """Update context with parameters from frontend"""

    # DEBUG: Confirm HTTP request
    print(f"Received request at {request.url}")

    # Get frontend parameters
    json_object = request.json

    context.genre = json_object.get("genre")
    context.max_beats = json_object.get("storyLength")
    context.user_name = json_object.get("name")

    # DEBUG: Confirm receiving parameters
    print(f"Genre: {context.genre}")
    print(f"Length: {context.max_beats}")
    print(f"Name: {context.user_name}")

    # Must include return statement or it will result in error
    return jsonify({'message': 'parameters received'})


# **************************************************
#         Main
# **************************************************
if __name__ == "__main__":
    # Tweak Story Context
    # TODO: Get frontend parameters and set context with them

    # context.story_history[0] = (
    #                       f"Give me an introduction to a {context.genre} "
    #                       f"story with character named {context.user_name}."
    #                       f"This introduction shall not "
    #                       f"exceed {context.max_text_length}.")

    # TODO: Create a path and/or function to reset story context back to start

    # Initialize App
    app.run(debug=True)

    # Eliminated the loop in place of app.run.
    # TODO - I think we need to set up an end-point.
    """
    Actually, I think we need two.
    The first endpoint is triggered when story starts, prepping story
    with the default values.
    The second endpoint is triggered when a choiec is made, triggering
    an update of all the story variables (same info from loop basically)
    """
