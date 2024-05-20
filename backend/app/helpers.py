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
#                    Prompts
# **************************************************
# TODO - Breakdown prompting into smaller chunks and multiple functions?
# TODO - History is handled in the prompt request and can be omitted
# TODO - Incldue the text from the users choice if possible in this request
def get_story_prompt(context: StoryContext) -> str:
    """Generates a prompt to feed the API to generate next paragrpah."""
    # Gameover Check
    if context.gameover:
        narrative = (
            f"After the events of '{context.story_history[-1]}', "
            f"our story concludes in the genre of {context.genre}. "
        )

        game_over_reason = (
            f"The choices made: {', '.join(context.user_choice)} "
            "led to an outcome where the protagonist could no longer continue."
        )

        return (f"{narrative} {game_over_reason}")

    # TODO - Adjust the prompt phrasing potentially
    # Construct the narrative context
    # Construct the narrative context
    narrative = (
        f"After the events of '{context.story_history[-1]}', "
        # TODO - Add the choice that was made
        f"our story continues in the genre of {context.genre}, "
        f"reaching a pivotal moment at beat {context.current_beat} of "
        f"{context.max_beats}, with the current intensity described as "
        f"{intensity_descriptor[context.intensity]}."
    )

    # Construct the choice options
    # TODO - Consider translating tag phrasing for this section
    choices = ""
    for i in range(3):
        option = (
            f"{i+1}. A choice that features elements related to "
            f"'{', '.join(context.choice_tags[i])}', "
        )
        choices += option

    # Construct the climax status
    if context.climax:
        climax_status = "This should be constructed as a climactic moment."
    else:
        climax_status = ""

    # Combine the elements into a cohesive prompt
    prompt = (
        f"{narrative} The scene is influenced by these themes: "
        f"{', '.join(context.user_choice)}. {climax_status} "
        "Craft a scene that includes the following three choices, "
        "each option starting with !!: "
        f"{choices}"
    )

    return prompt
    # TODO - Ensure last story beat (game over or final) has no choices.


def get_image_prompt(context: StoryContext):
    """Given current paragraph, u"""
    prompt = (
        f"Create an image in the {context.genre} style "
        f"based on the narrative: '"
        f"{context.story_history[context.current_beat]}'"
    )
    return prompt


# Test helper functions
if __name__ == "__main__":
    prompt = get_story_prompt(test_context)
    print(prompt)


# TODO - Document the different variable options in README.
# TODO - Note choices start with !!
# TODO - Adjust tag values
