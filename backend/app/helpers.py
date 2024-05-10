import random
from context import StoryContext

# **************************************************
#                    Variables
# **************************************************
intensity_descriptor = {0: "gentle, serene",
                        1: "normal",
                        2: "high stakes requiring careful choices",
                        3: "climatic moments"}


# **************************************************
#                    Tags
# **************************************************
def get_choice_tags(context: StoryContext) -> list[set[str]]:
    """Returns the tag options to be used in next story beat."""
    # Determine the combined weight of all options
    choice_weights = dict()  # {tag_name: weight}

    # Add weights associated with each tag
    for outer_tag in context.user_choice:
        for inner_tag in context.tag_weights[outer_tag]:
            # Fetches current weight or sets to 0 if non-existant
            current_weight = choice_weights.get(inner_tag, 0)
            # Adds the new weight
            choice_weights[inner_tag] = current_weight + context.tag_weights[outer_tag][inner_tag]

    # Randomly select tags based on weight
    future_tag_options = []  # [{"tag", "tag"}, {"tag"}...]
    keys = list(choice_weights.keys())
    weights = list(choice_weights.values())
    for _ in range(context.num_of_choices):
        future_tag_options.append(_select_tag_set(keys, weights))

    # Determine if climax tag needs added
    _update_climax_status(context)

    return future_tag_options


def _select_tag_set(keys, weights) -> set:
    """
    Helper func that determines a set of tags for ONE choice.
    Call this for each choice the user will be presented.
    """
    choice = []
    # Pick first tag
    choice.append(random.choices(keys, weights=weights, k=1)[0])
    # Pick additional tags at increasingly lower chances
    if random.randint(1, 100) <= 25:
        choice.append(random.choices(keys, weights=weights, k=1)[0])
    if random.randint(1, 100) <= 5:
        choice.append(random.choices(keys, weights=weights, k=1)[0])
    return set(choice)


def _update_climax_status(context: StoryContext):
    """Use AFTER new tags generated.  Determines if climax should be used.
    Updates the tags AND internal variables in StoryContext"""
    climax_ready = (context.max_beats * 3 / 4) > context.current_beat
    # Turn off climax if it already happened
    if context.climax is True:
        context.climax = False
    # Otherwise check if it should be activated
    elif climax_ready:
        for tag_set in context.cur_tags:
            tag_set.add("climax")
        context.climax = True


def process_selection(context: StoryContext, user_input):
    """
    Update context based on user selections.
    """
    # TODO - I don't have actual user_input format yet to phrase this...
    context.user_choice = user_input["choice"]
    # TODO - Optional We could also use to update beat num or story history

    # Update Lives
    # TODO - probably not best to hardcode the string name here...
    for tag in context.user_choice:
        if tag == "gain_life" and context.current_lives < context.max_lives:
            context.current_lives += 1
        if tag == "lose_life":
            context.current_lives -= 1
        if context.current_lives < 0:
            print("GAME OVER")
            # TODO - Generate a game over prompt and signal to front to end.
            # TODO - Wait for updates on routes before attempting


# **************************************************
#                    Prompts
# **************************************************
def get_story_prompt(context: StoryContext) -> str:
    """Generates a prompt to feed the API to generate next paragrpah."""
    # TODO - Adjust the prompt phrasing potentially
    # Construct the narrative context
    narrative = (
        f"After the events of '{context.story_history[-1]}', "
        # TODO - Add the choice that was made
        f"our story continues in the genre of {context.genre}, "
        f"reaching a pivotal moment at beat {context.current_beat} of "
        f"{context.max_beats}, with the current intensity described as "
        f"{intensity_descriptor[context.intensity]}."
    )

    # Construct the choice options
    # TODO - Consider translating tag phrasing for this section
    choices = ""
    for i in range(3):
        option = (
            f"{i+1}. A choice that features elements related to "
            f"'{', '.join(context.cur_tags[i])}', "
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
        f"{', '.join(context.cur_tags)}. {climax_status} "
        "Craft a scene that includes the following three choices: "
        f"{choices}"
    )

    return prompt


def get_image_prompt(context: StoryContext):
    """Given current paragraph, u"""
    prompt = (
        f"Create an image in the {context.genre} style "
        f"based on the narrative: '"
        f"{context.story_history[context.current_beat]}'"
    )
    return prompt


# Note - Remember to update previous_paragraph after current_paragraph used
# TODO - Add functions to handle class updates as needed.
# TODO - Adjust tag values
