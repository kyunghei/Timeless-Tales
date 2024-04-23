import json
import random
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(script_dir, 'tags.json')


def get_choice_tags(current_tags: list[str], num_choices):
    """Given a list of the tags associated with most recent choice.
    Returns num_tag lists containing tags for future choices."""
    # TODO - We only need to open JSON once.  This could be tied into backend instead of function.
    with open(json_path, 'r') as file:
        json_data = json.load(file)
    
    # Determine Probabilities
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
                     
# print(get_choice_tags(["regular"], 3))


# TODO
# Create two test functions
# Test function 1 - tests 1000s of stories and lists tag frequency across all 10k
def bulk_test_results(num_iterations, story_length, num_choices):
    """During each iteration, pick a random choice and generate next batch based on selection.
    Returns a count of each selected tag."""
    print("BULK")
    frequency = dict()
    i = 0
    while i < num_iterations:
        print("ITERATION")
        n = 0
        current_tags = {"regular"}
        while n < story_length:
            for tag in current_tags:
                if tag in frequency:
                    frequency[tag] += 1
                else:
                    frequency[tag] = 0
            # Add current tags to dict that tracks number
            choices = get_choice_tags(current_tags, num_choices)
            current_tags = choices[random.randint(0,2)]
            n += 1
        i += 1
    print(frequency)
    
        
# Test function 2- tests a single story and the flow of tags
def test_story_flow(story_length):
    """Print out the flow of tags in order, starting with a regular decision."""
    n = 0
    current_tags = {"regular"}
    print("LOOP")
    while n < story_length:
        print(n+1, current_tags)
        choices = get_choice_tags(current_tags, 3)
        current_tags = choices[random.randint(0,2)]
        n += 1

bulk_test_results(10, 10, 3)        
test_story_flow(10)

# TODO - Account for climax and other variables
# TODO - Adjust values