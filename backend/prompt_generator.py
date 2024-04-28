intensity_scale = ["gentle, serene", "normal", "high stakes requiring careful choices", "climatic moments"]


def get_story_prompt(genre: str, previous_beat: str, active_tags: list[str], max_length: int, current_beat: int, intensity: int, climax_occured: bool, new_tags: list[str]):
    # Construct the narrative context
    narrative_context = f"After the events of '{previous_beat}', our story continues in the genre of {genre},"
    narrative_context += f" reaching a pivotal moment at beat {current_beat} of {max_length},"
    narrative_context += f" with the current intensity described as {intensity_scale[intensity]}."

    # Detail the story's progression and status of the climax
    if intensity >= 4 or max_length/2 + 1 > current_beat:
        for tag_list in new_tags:
            tag_list.append("climax")
    climax_status = "has already occurred." if climax_occured else "has not occurred yet."

    # Combine the elements into a cohesive prompt
    prompt = (f"{narrative_context} The scene is influenced by these themes: {', '.join(active_tags)}. "
              f"The climax {climax_status} "
              "Craft a scene that includes the following three choices: "
              f"1. A choice that features elements related to '{', '.join(new_tags[0])}', "
              f"2. A choice that features elements related to '{', '.join(new_tags[1])}', "
              f"3. A choice that features elements related to '{', '.join(new_tags[2])}'.")
    
    return prompt


def get_image_prompt(current_beat, genre):
    prompt = (f"Create a visual image prompt based on the current narrative: '{current_beat}'. "
              f"This scene is set in a {genre} context.")
    return prompt
    
# TODO - Consider using alternative wording for each tag to better prompt ChatGPT?
# TODO - Update climax occured in main