# TODO - Adjust tag values
# TODO - Save json instead of reloading each time
# TODO - Tests don't consider climax or tags added by other means

import json
import random
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(script_dir, 'tags.json')


def get_choice_tags(current_tags: list[str], num_choices):
    """ This function is utilized to determine the tags options for next story beat.
    Given the list of tags, returns a list of num_choices sets of tags."""
    # TODO - Here is where JSON needs to be reimplemented
    with open(json_path, 'r') as file:
        json_data = json.load(file)
    
    # Determine Weight of Each Option
    tag_weights = dict()
    for tag in current_tags:
        value_dict = json_data[tag]
        for value_key in value_dict:
            if value_key in tag_weights:
                tag_weights[value_key] += value_dict[value_key]
            else:
                tag_weights[value_key] = value_dict[value_key]         
    
    # Determine Resulting Tags
    all_choices = []
    keys = list(tag_weights.keys())
    weights = list(tag_weights.values())
    for _ in range(num_choices):
        single_choice = []
        single_choice.append(random.choices(keys, weights=weights, k=1)[0])
        # Lower chance for multi-tags
        if random.randint(1, 100) <= 25:
            single_choice.append(random.choices(keys, weights=weights, k=1)[0])
        if random.randint(1, 100) <= 5:
            single_choice.append(random.choices(keys, weights=weights, k=1)[0])
        all_choices.append(set(single_choice))  # Remove duplicates before saving
    
    return all_choices
    # TODO - First tag is always regular.  Climax tag automatically inserted based on story length
                     
def _function():
    pass


def test_tag_frequency(num_iterations, story_length, num_choices):
    """Counts the number of times each tag appears in multiple simulated stories."""
    frequency_count = dict()
    i = 0
    while i < num_iterations:
        n = 0
        current_tags = {"regular"}
        while n < story_length:
            frequency_count = _update_frequency(frequency_count, current_tags)
            # Determine next choice
            choices = get_choice_tags(current_tags, num_choices)
            current_tags = choices[random.randint(0,2)]
            n += 1
        i += 1
    print(frequency_count)
    
def _update_frequency(frequency_count, current_tags):
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
