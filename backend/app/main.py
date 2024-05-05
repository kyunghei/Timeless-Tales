# from flask import Flask
import os
import openai
from dotenv import load_dotenv
from .. import prompt_generator

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


if __name__ == "__main__":

    # TODO: Get parameters from user selection at the front-end
    context = prompt_generator.StoryContext(genre="Genre",
                                            max_beats=12,
                                            max_text_length=10,
                                            current_beat=0)

    # TODO: Get user name at the front-end
    user_name = ""

    # List to hold story history
    story_history = []

    # Initial text prompt to start the story
    initial_text_prompt = (f"Give me an introduction to a {context.genre} "
                           f"story with a character named {user_name}. "
                           f"This introduction shall not "
                           f"exceed {context.max_text_length}.")

    # Get text introduction for the story
    introduction = get_story_part(initial_text_prompt, story_history)

    # Add introduction to story history
    story_history.append(introduction)

    # Get image URL based on introduction
    image_URL = get_image_URL(introduction)

    # TODO: Send text to front-end to be displayed

    # TODO: Send image to front-end to be displayed, look into saving image

    # Set introduction as previous paragraph
    context.previous_paragraph = introduction

    # Loops until story is over
    # TODO: Need conditions of loop termination
    while True:
        # Get prompt for next story part
        prompt = prompt_generator.get_story_prompt(context)

        # Get story part (i.e. current paragraph), image
        current_paragraph = get_story_part(prompt, story_history)
        story_history.append(current_paragraph)
        image_prompt = prompt_generator.get_image_prompt(context,
                                                         current_paragraph)
        image_URL = get_image_URL(image_prompt)

        # TODO: Send text and image to front-end to be displayed

        # Update previous paragraph attribute
        context.previous_paragraph = current_paragraph
