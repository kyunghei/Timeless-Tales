import random
import helpers
from context import context, StoryContext


def test_tag_frequency(context: StoryContext, num_iterations):
    """Counts frequency of each tag appears in multiple simulated stories."""
    frequency_count = dict()
    i = 0
    while i < num_iterations:
        context.reset_to_default()
        current_tags = {"regular"}
        while context.current_beat < context.max_beats:
            frequency_count = _update_tag_freq(frequency_count, current_tags)
            # Determine next choice
            choices = helpers.get_choice_tags(context)
            current_tags = choices[random.randint(0, 2)]
            context.current_beat += 1
        i += 1
    print(frequency_count)


def test_tag_selection(story_length, num_choices):
    """Prints out a potential set of tags in the order they were selected."""
    n = 0
    current_tags = {"regular"}
    while n < story_length:
        print(n+1, current_tags)
        choices = helpers.get_choice_tags(context)
        current_tags = choices[random.randint(0, num_choices-1)]
        n += 1


def _update_tag_freq(frequency_count, current_tags):
    """Helper that counts how often tag appears."""
    for tag in current_tags:
        if tag in frequency_count:
            frequency_count[tag] += 1
        else:
            frequency_count[tag] = 0
    return frequency_count


def main():
    """Allows for tag testing when this file run directly."""
    iterations = 10
    story_length = 10
    num_choices = 3

    test_tag_frequency(context, iterations)
    test_tag_selection(story_length, num_choices)


if __name__ == "__main__":
    main()
