import json
import random
import os
from dataclasses import dataclass


default_tags = [{"regular"}, {"regular"}, "regular"]
# TODO - Convert intensity scale to dict.  Will require update elsewhere
intensity_scale = ["gentle, serene",
                   "normal",
                   "high stakes requiring careful choices",
                   "climatic moments"]

@dataclass
class StoryContext:
    # Constants
    genre: str = "Neutral"
    max_beats: int = 10
    max_text_length: int = 1000
    # Story Status
    current_beat: int = 0
    intensity: int = 0
    climax: bool = False
    # Story Tags
    current_tags: list[str] = default_tags
    new_tags: list[str] = default_tags
    # Story History
    story_history: list[str] = "No previous data"
    previous_prompt: str = "No previous data"



script_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(script_dir, 'tags.json')


def get_choice_tags(current_tags: list[str], num_choices) -> list[set[str]]:
    """ Determines the tag options for next story beat."""
    # TODO - Here is where JSON needs to be reimplemented
    # Prepare JSON Data
    with open(json_path, 'r') as file:
        json_data = json.load(file)

    # Determine the combined weight of all options
    result_weight = dict()
    for tag in current_tags:
        # Each current tag has its own base_weight dict
        # This gives base odds of each result
        base_weight = json_data[tag]
        result_weight = _adjust_weight(base_weight, result_weight)

    # Determine Resulting Tags
    all_choices = []
    keys = list(result_weight.keys())
    weights = list(result_weight.values())
    for _ in range(num_choices):
        all_choices.append(_generate_choice(keys, weights))

    return all_choices


def _adjust_weight(base_weight, result_weight):
    """Helper that determines the resulting weights of all tags combined"""
    for tag_name in base_weight:
        if tag_name in result_weight:
            result_weight[tag_name] += base_weight[tag_name]
        else:
            result_weight[tag_name] = base_weight[tag_name]

    return result_weight


def _generate_choice(keys, weights) -> set:
    """Helper function that returns the tag(s) for ONE choice."""
    choice = []
    # Pick first tag
    choice.append(random.choices(keys, weights=weights, k=1)[0])
    # Pick additional tags at increasingly lower chances
    if random.randint(1, 100) <= 25:
        choice.append(random.choices(keys, weights=weights, k=1)[0])
    if random.randint(1, 100) <= 5:
        choice.append(random.choices(keys, weights=weights, k=1)[0])
    return set(choice)


def test_tag_frequency(num_iterations, story_length, num_choices):
    """Counts frequency of each tag appears in multiple simulated stories."""
    frequency_count = dict()
    i = 0
    while i < num_iterations:
        n = 0
        current_tags = {"regular"}
        while n < story_length:
            frequency_count = _update_frequency(frequency_count, current_tags)
            # Determine next choice
            choices = get_choice_tags(current_tags, num_choices)
            current_tags = choices[random.randint(0, 2)]
            n += 1
        i += 1
    print(frequency_count)


def _update_frequency(frequency_count, current_tags):
    """Helper that counts how often tag appears."""
    for tag in current_tags:
        if tag in frequency_count:
            frequency_count[tag] += 1
        else:
            frequency_count[tag] = 0
    return frequency_count


def test_tag_selection(story_length, num_choices):
    """Prints out a potential set of tags in the order they were selected."""
    n = 0
    current_tags = {"regular"}
    while n < story_length:
        print(n+1, current_tags)
        choices = get_choice_tags(current_tags, num_choices)
        current_tags = choices[random.randint(0, num_choices-1)]
        n += 1


def main():
    """Allows for tag testing when this file run directly."""
    iterations = 10
    story_length = 10
    num_choices = 3

    test_tag_frequency(iterations, story_length, num_choices)
    test_tag_selection(story_length, num_choices)


if __name__ == "__main__":
    main()










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

# TODO - Adjust tag values
# TODO - Save json instead of reloading each time
