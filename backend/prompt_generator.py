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
    climax_occured: bool


def get_story_prompt(context: StoryContext):
    """Generates a prompt to feed the API to generate next paragrpah."""

    # Construct the narrative context
    narrative_context = f"After the events of '{context.previous_paragraph}',our story continues in the genre of {context},"
    narrative_context += f" reaching a pivotal moment at beat {context.current_beat} of {context.max_beats},"
    narrative_context += f" with the current intensity described as {intensity_scale[context.intensity]}."

    # Detail the story's progression and status of the climax
    if context.intensity >= 4 or context.max_beats/2 + 1 > context.current_beat:
        for tag_list in context.new_tags:
            tag_list.append("climax")
    climax_status = "has already occurred." if context.climax_occured else "has not occurred yet."

    # Combine the elements into a cohesive prompt
    prompt = (f"{narrative_context} The scene is influenced by these themes: {', '.join(context.previous_tags)}. "
              f"The climax {climax_status} "
              "Craft a scene that includes the following three choices: "
              f"1. A choice that features elements related to '{', '.join(context.new_tags[0])}', "
              f"2. A choice that features elements related to '{', '.join(context.new_tags[1])}', "
              f"3. A choice that features elements related to '{', '.join(context.new_tags[2])}'.")
    
    return prompt


def get_image_prompt(current_beat, genre):
    prompt = (f"Create a visual image prompt based on the current narrative: '{current_beat}'. "
              f"This scene is set in a {genre} context.")
    return prompt

def check_climax(context: StoryContext):
    """Updates information about climax independently from other funcs."""
    


# TODO - Consider using alternative wording for each tag to better prompt ChatGPT?
# TODO - Update climax occured in main