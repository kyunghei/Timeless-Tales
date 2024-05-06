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

# Story Tags
current_tags = [{"regular"}, {"regular"}, {"regular"}]
new_tags = [{"regular"}, {"regular"}, {"regular"}]
# Story History
story_history = []
previous_prompt = "This is the start of the story"
# Story Status
current_beat = 0
intensity = 0
climax = False


# **************************************************
#         Story Context Class
# **************************************************
class StoryContext:
    def __init__(self):
        # Basic Constants
        self.max_text_length: int = 1000
        self.num_of_choices: int = 3
        self.tag_weights = None  # Generated on init of the class

        # Constants from Frontend
        self.genre: str = "Neutral"
        self.max_beats: int = 10
        self.user_name: str = "Player"

        # Mutable Story Status
        self.current_beat: int = 0
        self.intensity: int = 0
        self.climax: bool = False

        # Mutable Story Tags
        self.current_tags: list[dict] = [{"regular"}, {"regular"}, {"regular"}]
        self.new_tags: list[dict] = [{"regular"}, {"regular"}, {"regular"}]

        # Story History
        self.story_history: list[str] = []
        self.previous_prompt: str = "This is the start of the story"

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
