import json
import random
import os
print("Files available:", os.listdir())

script_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(script_dir, 'tags.json')


# TODO
# Generate choice tags
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

                

                
            
        
    
    # Anything with 100% of greater chance is guranteed to occur (Add these at end if they weren't already selected selected.)
   
    # TODO - Use story length variables to assign climax tag

print(get_choice_tags(["regular"], 3))

# TODO
# Function that removes the tags from the API's response.
# We need method to store the tags associated with the user's choice as well

# TODO
# Create two test functions
# Test function 1 - tests 1000s of stories and lists tag frequency across all 10k
# Test function 2- tests a single story and the flow of tags