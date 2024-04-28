def get_prompt(genre, previous_prompt, active_tags, max_length, current_beat, intensity, climax_occured: bool, new_tags):
    # Construct the narrative context
    narrative_context = f"After the events of '{previous_prompt}', our story continues in the genre of {genre},"
    narrative_context += f" reaching a pivotal moment at beat {current_beat} of {max_length},"
    narrative_context += f" with the current intensity described as {intensity}."

    # Detail the story's progression and status of the climax
    climax_status = "has already occurred." if climax_occured else "has not occurred yet."

    # Combine the elements into a cohesive prompt
    prompt = (f"{narrative_context} The scene is influenced by these themes: {', '.join(active_tags)}. "
              f"The climax {climax_status} "
              "Craft a scene that includes the following three choices: "
              f"1. A choice that features elements related to '{', '.join(new_tags[0])}', "
              f"2. A choice that features elements related to '{', '.join(new_tags[1])}', "
              f"3. A choice that features elements related to '{', '.join(new_tags[2])}'.")
    
    return prompt
