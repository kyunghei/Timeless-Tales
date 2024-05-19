import json
import os

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

# Mutable Story Tags
user_choice = "choice"
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

    def reset_to_default(self):
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
        self.user_choice: set[str] = user_choice
        self.choice_options: dict[set[str]] = choice_options

        # Mutable Story History
        self.story_history: list[str] = story_history
        # self.previous_prompt: str = story_history[0]

    def reset_to_start(self):
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
        self.user_choice: set[str] = user_choice
        self.choice_options: dict[set[str]] = choice_options

        # Mutable Story History
        self.story_history: list[str] = story_history


# **************************************************
#         Initalize Context
# **************************************************
context = StoryContext()
