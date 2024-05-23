# Timeless Tales

A web application utilizing AI to create custom choose-your-own-adventure stories with dynamic choices/outcomes and relevant artwork.

## Internal Terminology

- **Story Beat**: A single scene of the story, including the image, generated paragraph, and presented choices.

- **Meta-Data**: Internal information used to guide API calls.

- **Choice Tags**: Tags that classify each type of choice. These tags are hidden and help determine how the story progresses based on the user's selections. This may include, modifying number of lives or modifying the next choice schema.

## Context Variables

This section details all the context variables used in the "Timeless Tales" application to manage the story flow, user interactions, and dynamic outcomes.

### Basic Constants

- **`max_text_length`** (*int*): The maximum length of the story paragraph.
- **`num_of_choices`** (*int*): The number of choice options presented to the user.

### Constants from Frontend

- **`genre`** (*str*): The genre of the story.
- **`max_beats`** (*int*): The maximum number of story beats or scenes.
- **`username`** (*str*): The username of the player.

### Mutable Story Status

- **`current_lives`** (*int*): The current number of lives the player has.
- **`max_lives`** (*int*): The maximum number of lives the player can have.
- **`current_beat`** (*int*): The current position in the story progression.
- **`intensity`** (*int*): The current mood or intensity level of the story, often influencing the tone of the narrative.
- **`climax`** (*bool*): Indicates whether the story has reached a climactic moment.
- **`gameover`** (*bool*): Indicates whether the game has reached a conclusion, either by reaching the narrative end or through player failure.

### Mutable Story Tags

- **`user_choice`** (*str*): The most recent choice made by the user, detailed enough to influence future story developments. Example: `"regular"`
- **`choice_options`** (*dict[str: set] *): List of current options given to the user, tagged to classify each type of choice. These tags help determine how the story progresses. Example: `{"Choice 1": {"regular"}, "Choice 2: {"regular", "foreshadow"}, "Choice 3": {"climax", "lose_life}}`

### Mutable Story History

- **`story_history`** (*list[str]*): A list of all story beats generated so far, representing the narrative history as the story progresses.

### Additional Notes

- **`tag_weights`**: A probability matrix that provides the odds of each outcome based on current tags. This matrix is generated automatically via `tags.json` and is critical in managing the dynamic story flow based on the decisions made by the user.

## List of Story Tags

In "Timeless Tales," each choice made by the player is influenced by tags that guide the narrative progression and outcomes. Here is a comprehensive list of all possible tags, each uniquely influencing the story's development:

- **`regular`**: Represents standard progressions or outcomes in the story.
- **`gain_life`**: Affects the protagonist's chances by increasing their lives.
- **`lose_life`**: Leads to a decrease in the protagonist's lives.
- **`resolve`**: Indicates a resolution or conclusion of current story elements.
- **`raise_intensity`**: Increases the intensity or stakes of the narrative.
- **`lower_intensity`**: Decreases the narrative's tension or stakes.
- **`climax`**: Marks a pivotal or climactic moment in the story.
- **`false_calm`**: Creates a deceptive sense of security before a significant event.
- **`foreshadow`**: Hints at future events or outcomes.
- **`dilemma`**: Presents a difficult choice or moral question.
- **`challenge`**: Introduces obstacles or tests for the protagonist.
- **`opportunity`**: Offers a chance for significant progress or advantage.

Each tag is part of a probability matrix that helps determine the likelihood of specific outcomes, ensuring each choice's impact is dynamically integrated into the narrative flow.
