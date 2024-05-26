from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv
import helpers
from context import context, split_choices


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
    Includes condition for 1st iteration.
    """
    # DEBUG: Confirm HTTP request
    print(f"Received request at {request.url}")

    # Retrieve Story Info
    if context.current_beat > 0:
        choice1, choice2, choice3 = list(context.choice_options.keys())
    else:
        # DEBUG
        print("First /story call")
        # What do we do on first beat only
        prompt = helpers.get_story_prompt(context)
        story_text = get_story_part(prompt, context.story_history)
        story_text, choice1, choice2, choice3 = split_choices(story_text)
        context.story_history.append(story_text)
        context.choice_options = {choice1: {"regular"},
                                  choice2: {"regular"},
                                  choice3: {"regular"}}

    # Generate Image
    image_prompt = helpers.get_image_prompt(context)
    story_image = get_image_URL(image_prompt)
    # DEBUG IMAGE to save API costs
    # story_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4NvLQAn3DFg-KAeSiGOuZBsiXDcdtK8__Pgokt4NMjQ&s"  # noqa

    # Return Data
    response_data = {
        'story_text': context.story_history[-1],
        'choice_1': choice1,
        'choice_2': choice2,
        'choice_3': choice3,
        'story_image': story_image,
        'current_beat': context.current_beat,
        'current_lives': context.current_lives
    }
    # DEBUG
    print(f"RESPONSE DATA: {response_data}")
    return jsonify(response_data)


@app.route('/next-beat', methods=['GET'])
def next_beat():
    """
    Same as /story but for subsequent beats only.
    """
    # DEBUG: Confirm HTTP request
    print(f"Received request at {request.url}")

    # Retrieve Story Info
    choice1, choice2, choice3 = list(context.choice_options.keys())

    # Generate Image
    image_prompt = helpers.get_image_prompt(context)
    story_image = get_image_URL(image_prompt)
    # DEBUG IMAGE to save API costs
    # story_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4NvLQAn3DFg-KAeSiGOuZBsiXDcdtK8__Pgokt4NMjQ&s"  # noqa

    # Return Data
    response_data = {
        'story_text': context.story_history[-1],
        'choice_1': choice1,
        'choice_2': choice2,
        'choice_3': choice3,
        'story_image': story_image,
        'current_beat': context.current_beat,
        'current_lives': context.current_lives
    }
    print(f"RESPONSE DATA: {response_data}")
    return jsonify(response_data)


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


@app.route('/user-choice', methods=['POST'])
def get_next_beat():
    """
    Updates story context based on user choice.
    """
    # DEBUG: Confirm HTTP request
    print(f"Received request at {request.url}")

    # Get user choice
    json_object = request.json
    user_choice = helpers.convert_choice(context,
                                         json_object.get("user_choice"))

    story_prompt = helpers.get_story_prompt(context)
    story_text = get_story_part(story_prompt, context.story_history)
    context.next_beat(user_choice, story_text)

    return jsonify({'message': 'choice received.  story updated.'})


@app.route('/restart', methods=['POST'])
def restart_story():
    """
    Restarts the story by maintaining customizable setting
    but restarting story specific details.
    """
    # DEBUG: Confirm HTTP request
    print(f"Received request at {request.url}")

    context.reset_mutables()

    # Must include return statement or it will result in error
    return jsonify({'message': 'story reset'})


# **************************************************
#         Main
# **************************************************
if __name__ == "__main__":
    # Initialize App
    app.run(debug=True)
