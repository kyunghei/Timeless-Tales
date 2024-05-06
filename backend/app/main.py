# from flask import Flask, request, jsonify
import os
import openai
from dotenv import load_dotenv
import helpers
from context import context

# app = Flask(__name__)

# from .. import set_choice_tags
# import webbrowser

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


"""
@app.route('post-story-beat', methods=['POST'])
def post_story_beat():
    prompt = helpers.get_story_prompt(context)
    story_beat = get_story_part(prompt, context.story_history)
    update_context(context)
    # TODO, we may need to seperate the choices from the paragraph
    return jsonify({'story_beat': story_beat})
    # Image, lives, and beat number as well
"""


if __name__ == "__main__":
    # TODO: Get parameters from user selection at the front-end
    # TODO: Get user name at the front-end
    """
    context = helpers.StoryContext(
        genre="Genre",
        max_beats=12,
        max_text_length=10,
        current_beat=0,
        user_name=""
    )
    """

    # Initial text prompt to start the story
    initial_text_prompt = (f"Give me an introduction to a {context.genre} "
                           f"story with a character named {context.user_name}."
                           f"This introduction shall not "
                           f"exceed {context.max_text_length}.")

    # Get text introduction for the story
    introduction = get_story_part(initial_text_prompt, context.story_history)

    # Add introduction to story history
    context.story_history.append(introduction)

    # Get image URL based on introduction
    image_URL = get_image_URL(introduction)

    # TODO: Send text to front-end to be displayed

    # TODO: Send image to front-end to be displayed, look into saving image

    # Set introduction as previous paragraph
    context.previous_paragraph = introduction

    # Loops until story is over
    # TODO: Need conditions of loop termination
    while True:
        # Generate next set of tags
        context.new_tags = helpers.get_choice_tags(context)

        # Get prompt for next story part
        prompt = helpers.get_story_prompt(context)

        # Get story part (i.e. current paragraph), image
        current_paragraph = get_story_part(prompt, context.story_history)
        context.story_history.append(current_paragraph)
        image_prompt = context.get_image_prompt(context,
                                                current_paragraph)
        image_URL = get_image_URL(image_prompt)

        # TODO: Send text and image to front-end to be displayed

        # Update previous paragraph attribute
        context.previous_paragraph = current_paragraph

        # app.run(debug=True)


# TODO, set initial data then make the POST request
