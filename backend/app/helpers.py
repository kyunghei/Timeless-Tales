# TODO - Adjust tag values

from context import StoryContext
from context import context as test_context

# **************************************************
#                    Variables
# **************************************************
intensity_descriptor = {0: "gentle, serene",
                        1: "normal",
                        2: "high stakes requiring careful choices",
                        3: "climatic moments"}


# **************************************************
#                    Prompts Getters
# **************************************************
def get_story_prompt(context: StoryContext) -> str:
    """
    Generates a prompt to feed the API to generate next paragrpah.
    """
    prompt = []
    # General Details
    prompt.append(_describe_background(context))
    prompt.append(_describe_narrative(context))
    # Determine if story is about to end
    end_state = context.gameover or context.max_beats <= context.current_beat
    # Add conditional details
    if end_state:
        prompt.append(_describe_ending(context))
    if context.climax:
        prompt.append(_describe_climax(context))
    if not end_state:
        prompt.append(_describe_choices(context))

    return " ".join(prompt)


def get_image_prompt(context: StoryContext):
    """
    Generates a prompt for an image.
    """
    prompt = (
        f"Create an image in the {context.genre} style "
        f"based on the narrative: '"
        f"{context.story_history[context.current_beat]}'"
    )
    return prompt


# **************************************************
#                    Prompts Helpers
# **************************************************
def _describe_background(context: StoryContext):
    """
    Gives the API the current background info.
    Such as: genre, current progress, tone
    Note - History is handled in the API request itself.
    """
    background = (
        f"We are currently {context.current_beat} out of {context.max_beats} "
        f"of the way through a story in the {context.genre} genre. "
        f"Our character is named: {context.user_name}. "
    )
    if context.current_beat != 0:
        background += (
            f"In the previous scene, the user chose to {context.user_choice}. "
        )
    return background


def _describe_narrative(context: StoryContext):
    """
    Request the API generate the narrative
    """
    narrative = (
        f"Given this context, please describe what happens next. "
        f"Limit this description to {context.max_text_length} words."
    )
    return narrative


def _describe_climax(context: StoryContext):
    """
    Request the API work in a climatic description.
    """
    # TODO - This is its own function so we can split climax
    # from the scene leading to the climax.
    return "Construct this response as the story's climax."


def _describe_ending(context: StoryContext):
    """
    Request the API generate the end of the story.
    """
    narrative = []
    narrative.append("This is the final paragraph of the story.")
    if context.gameover:
        narrative.append("The most recent choice has led to a gameover.")
    narrative.append("Please write a satisfying conclusion.")

    return " ".join(narrative)


def _describe_choices(context: StoryContext):
    setup = (
        f"Additionally, give the user {context.num_of_choices} choices "
        f"allowing them to decide what they will do next. "
        f"Each generated choice option MUST begin with !!. "
    )

    choices = ""

    for _, tags_set in context.choice_options.items():
        tags = list(tags_set)
        choice_text = (
            f"Include a choice that features elements related to "
            f"these themes: '{', '.join(tags)}'. "
        )
        choices += choice_text

    clarification = (
        "Avoid any text after the choices are given "
        "and use !! instead of numbers for each option. "
    )

    return setup + choices + clarification


# **************************************************
#                    Other Helpers
# **************************************************
def convert_choice(context: StoryContext, user_choice_json):
    """
    Front-end gives user choice in format: "choice_1"
    This function uses the output to instead get the
    text associated with that choice.
    """
    number = int(user_choice_json.split('_')[1]) - 1
    choice_list = list(context.choice_options.keys())
    user_choice = choice_list[number]

    return user_choice


# **************************************************
#                    Main
# **************************************************
if __name__ == "__main__":
    prompt = get_story_prompt(test_context)
    print(prompt)
