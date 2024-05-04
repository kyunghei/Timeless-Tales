# TODO - Most of file redundant consider removing

# TODO - Adjust tag values
# TODO - Save json instead of reloading each time
# TODO - Tests don't consider climax or tags added by other means

import json
import random
import os

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