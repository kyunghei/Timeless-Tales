from flask import Flask, jsonify, request
import os
import openai
from dotenv import load_dotenv
import helpers
from context import context

# import webbrowser


app = Flask(__name__)

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
@app.route('/post-story-beat', methods=['POST'])
def post_story_beat():
    """Returns data for front-end to utilize and display."""
    # Generate Information
    story_prompt = helpers.get_story_prompt(context)
    story_text = get_story_part(story_prompt, context.story_history)
    story_text, choice1, choice2, choice3 = helpers.split_choices(story_text)

    # Update Internal Data
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


def update_story_context(story_prompt):
    """Grabs data from front-end to update backend data."""
    # Adjust History
    context.story_history.append(story_prompt)
    # Update Tags
    context.prev_tags = context.cur_tags
    context.cur_tags = helpers.get_choice_tags(context)
    # Update other data
    context.current_beat += 1
    # TODO - Adjust Lives
    # TODO - Store choice user selected


@app.route('/customization', methods=['POST'])
def get_parameters():
    """Update context with parameters from frontend"""

    # DEBUG: Confirm HTTP request
    print(f"Received {request.method} request at {request.url}")

    # Get frontend parameters
    json_object = request.json

    context.genre = json_object.get("genre")
    context.max_beats = json_object.get("selectedLength")
    context.user_name = json_object.get("selectedName")

    # DEBUG: Confirm receiving parameters
    print(f"Genre: {context.genre}")
    print(f"Length: {context.max_beats}")
    print(f"Name: {context.user_name}")


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
    app.run(host='localhost', port=5172, debug=True)

    # Eliminated the loop in place of app.run.
    # TODO - I think we need to set up an end-point.
    """
    Actually, I think we need two.
    The first endpoint is triggered when story starts, prepping story
    with the default values.
    The second endpoint is triggered when a choiec is made, triggering
    an update of all the story variables (same info from loop basically)
    """
