import json
import os
import random

# **************************************************
#         Story Context Default Values
# **************************************************
"""
This section sets up default values for StoryContext.
"""
# Basic Constant
max_text_length = 1000
num_of_choices = 3
tag_weights = None  # Generated on init of class

# Constants from Frontend
genre = "Neutral"
max_beats = 10
username = "Player"

# Mutable Story Status
current_lives = 3
max_lives = 3
current_beat = 0
intensity = 0
climax = False
gameover = False

# Mutable Story Tags & Choices
user_choice = "choice_1"
choice_options = {"choice_1": {"regular"},
                  "choice_2": {"regular"},
                  "choice_3": {"regular"}}

# Mutable Story History
story_history = ["This is the start of the story"]
# previous_prompt = "This is the start of the story"


# **************************************************
#         Story Context Class
# **************************************************
"""
This class exists to modularize on story variables into a single location.
This helps reduce inputs on functions that require multiple bits of info.
"""


class StoryContext:
    def __init__(self):
        self.reset_to_default()

        # Save story tag JSON file
        try:
            directory = os.path.dirname(os.path.abspath(__file__))
            # TODO - Should file name be hardcoded like this?
            json_path = os.path.join(directory, 'tags.json')
            with open(json_path, 'r') as file:
                self.tag_weights = json.load(file)
        except FileNotFoundError:
            print(f"Error: File {json_path} not found.")
        except json.JSONDecodeError:
            print(f"Error: Failed to decode JSON in {json_path}.")
        except Exception as e:
            print(f"Unexpected error occurred: {e}")

    # --------------------------------------------------
    #                       Set-Up
    # --------------------------------------------------
    def reset_all(self):
        """
        Resets all values to their starting state.
        """
        # Basic Constants
        self.max_text_length: int = max_text_length
        self.num_of_choices: int = num_of_choices
        # self.tag_weights = tag_weights

        # Constants from Frontend
        self.genre: str = genre
        self.max_beats: int = max_beats
        self.user_name: str = username

        # Mutable Story Status
        self.current_lives: int = current_lives
        self.max_lives: int = max_lives
        self.current_beat: int = current_beat
        self.intensity: int = intensity
        self.climax: bool = climax
        self.gameover: bool = gameover

        # Mutable Story Tags
        self.user_choice: str = user_choice
        self.choice_options: dict[str: set] = choice_options

        # Mutable Story History
        self.story_history: list[str] = story_history
        # self.previous_prompt: str = story_history[0]

    def reset_mutable(self):
        """
        Resets (mutable) values to starting state.
        Leaves constants untouched.
        """
        # Mutable Story Status
        self.current_lives: int = current_lives
        self.max_lives: int = max_lives
        self.current_beat: int = current_beat
        self.intensity: int = intensity
        self.climax: bool = climax
        self.gameover: bool = gameover

        # Mutable Story Tags
        self.user_choice: str = user_choice
        self.choice_options: dict[str: set] = choice_options

        # Mutable Story History
        self.story_history: list[str] = story_history

    # --------------------------------------------------
    #                       Tags
    # --------------------------------------------------
    def _get_choice_tags(self) -> list[set[str]]:
        """Returns the tag options to be used in next story beat."""
        # Determine the combined weight of all options
        choice_weights = dict()  # {tag_name: weight}

        # Add weights associated with each tag
        for outer_tag in self.choice_options[self.user_choice]:
            for inner_tag, weight in self.tag_weights[outer_tag].items():
                # Fetches current weight or sets to 0 if non-existant
                current_weight = choice_weights.setdefault(inner_tag, 0)
                # Adds the new weight
                choice_weights[inner_tag] = current_weight + weight

        # Randomly select tags based on weight
        future_tag_options = []  # [{"tag", "tag"}, {"tag"}...]
        keys = list(choice_weights.keys())
        weights = list(choice_weights.values())
        for _ in range(self.num_of_choices):
            future_tag_options.append(self._select_tag_set(keys, weights))

        # Determine if climax tag needs added
        self._update_climax_status()

        return future_tag_options

    def _select_tag_set(self, keys, weights) -> set:
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

    def _update_climax_status(self):
        """Adds climax tag if we're 75% of way through the story"""
        climax_ready = (self.max_beats * 3 / 4) > self.current_beat
        # Skip if climax already occured
        if self.climax is True:
            return
        # Otherwise check if it should be activated
        elif climax_ready:
            for key in self.choice_options:
                self.choice_options[key].add("climax")
            self.climax = True
    # TODO - Perhaps warn prompt ahead of time when context coming

    # --------------------------------------------------
    #                       Updating Context
    # --------------------------------------------------
    def _update_user_choice(self, user_choice):
        self.user_choice = user_choice

    def _update_context(self, api_response):
        """
        Given the latest api_response, updates story context.
        """
        self.current_beat += 1

        # Update Story and Tags
        story_text, choice1, choice2, choice3 = split_choices(api_response)
        tag1, tag2, tag3 = self._get_choice_tags()

        self.story_history.append(story_text)
        self.choice_options = {choice1: tag1,
                               choice2: tag2,
                               choice3: tag3}

        # Update Lives
        for tag in self.choice_options[self.user_choice]:
            if tag == "gain_life" and self.current_lives < self.max_lives:
                self.current_lives += 1
            if tag == "lose_life":
                self.current_lives -= 1
            if self.current_lives <= 0:
                self.gameover = True

    def next_beat(self, user_choice: str, api_response: str):
        """
        Public function that updates information for next beat.
        Ensures user_choice & rest of context processed in correct order.
        """
        self._update_user_choice(user_choice)
        self._update_context(api_response)


# **************************************************
#         Static Functions
# **************************************************
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


# **************************************************
#         Initalize Context
# **************************************************
context = StoryContext()
