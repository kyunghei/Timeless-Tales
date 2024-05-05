# TODO - Most of file redundant consider removing

from dataclasses import dataclass

intensity_scale = ["gentle, serene",
                   "normal",
                   "high stakes requiring careful choices",
                   "climatic moments"]


@dataclass
class StoryContext:
    # Constant
    genre: str
    max_beats: int
    max_text_length: int
    # Variable
    current_beat: int
    previous_paragraph: str = "Nothing, this is the start of story."
    previous_tags: list[str]
    new_tags: list[str]

    intensity: int = 0
    climax: bool


def get_story_prompt(context: StoryContext):
    """Generates a prompt to feed the API to generate next paragrpah."""
    # TODO - Adjust the prompt phrasing potentially
    # Construct the narrative context
    narrative = (
        f"After the events of '{context.previous_paragraph}', "
        f"our story continues in the genre of {context.genre}, "
        f"reaching a pivotal moment at beat {context.current_beat} of "
        f"{context.max_beats}, with the current intensity described as "
        f"{intensity_scale[context.intensity]}."
    )

    # Construct the choice options
    # TODO - Consider translating tag phrasing for this section
    choices = ""
    for i in range(3):
        option = (
            f"{i+1}. A choice that features elements related to "
            f"'{', '.join(context.new_tags[i])}', "
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
        f"{', '.join(context.previous_tags)}. {climax_status} "
        "Craft a scene that includes the following three choices: "
        f"{choices}"
    )

    return prompt


def get_image_prompt(context: StoryContext, current_paragraph):
    """Given current paragraph, u"""
    prompt = (f"Create an image in the {context.genre} style "
              f"based on the narrative:'{current_paragraph}'.")

    return prompt


def update_climax_tags(context: StoryContext):
    """Use AFTER new tags generated to determine
    if climax tags need to be adjusted."""
    climax_ready = (context.max_beats * 3 / 4) > context.current_beat
    # Turn off climax if it already happened
    if context.climax is True:
        context.climax = False
    # Otherwise check if it should be activated
    elif climax_ready:
        for tag_set in context.new_tags:
            tag_set.append("climax")
        context.climax = True
    # TODO: Consider a climax pending tag as well?

# Note - Remember to update previous_paragraph after current_paragraph used
# Not currently built in to avoid func tweaking vars at wrong time.
