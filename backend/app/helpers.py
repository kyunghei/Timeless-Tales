import random
from context import StoryContext
from context import context as test_context

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
        for inner_tag, weight in context.tag_weights[outer_tag].items():
            # Fetches current weight or sets to 0 if non-existant
            current_weight = choice_weights.setdefault(inner_tag, 0)
            # Adds the new weight
            choice_weights[inner_tag] = current_weight + weight

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


# **************************************************
#                    Prompts
# **************************************************
# TODO - Breakdown prompting into smaller chunks and multiple functions?
def get_story_prompt(context: StoryContext) -> str:
    """Generates a prompt to feed the API to generate next paragrpah."""
    # Gameover Check
    if context.gameover:
        narrative = (
            f"After the events of '{context.story_history[-1]}', "
            f"our story concludes in the genre of {context.genre}. "
        )

        game_over_reason = (
            f"The choices made: {', '.join(context.user_choice)} "
            "led to an outcome where the protagonist could no longer continue."
        )

        return (f"{narrative} {game_over_reason}")

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
            f"'{', '.join(context.choice_options[context.user_choice])}', "
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
        f"{', '.join(context.choice_options[context.user_choice])}. "
        f"{climax_status} "
        "Craft a scene that includes the following three choices, "
        "each option starting with !!: "
        f"{choices}"
    )

    return prompt
    # TODO - Ensure last story beat (game over or final) has no choices.


def get_image_prompt(context: StoryContext):
    """Given current paragraph, u"""
    prompt = (
        f"Create an image in the {context.genre} style "
        f"based on the narrative: '"
        f"{context.story_history[context.current_beat]}'"
    )
    return prompt


def split_choices(input_string):
    """
    Given prompt generated by API, splits it into story text and three choices.
    Assumes choices are divived at !!.
    """
    choices = input_string.split("!!")
    story_text = choices[0].strip()
    choice_1 = choices[1].strip()
    choice_2 = choices[2].strip()
    choice_3 = "!!".join(choices[3:]).strip()

    return story_text, choice_1, choice_2, choice_3
    # TODO - what's the back-up if GPT does not make a !! divider?


# Test helper functions
if __name__ == "__main__":
    prompt = get_story_prompt(test_context)
    print(prompt)


# TODO - Document the different variable options in README.
# TODO - Note choices start with !!
# TODO - Adjust tag values
