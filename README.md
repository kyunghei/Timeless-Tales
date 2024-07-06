# Timeless Tales

Timeless Tales is an interactive storytelling web application that uses OpenAI's GPT API to dynamically generate story text and images. This project was developed by a collaborative team, with a frontend built using React and a backend developed in Python.

## Features
- **Dynamic Story Generation:** Utilizes OpenAI's GPT API to generate engaging and interactive story content.
- **React Frontend:** Implements state management and ensures seamless story transitions for an enhanced user experience.
- **Python Backend:** Developed a story engine that uses tagged prompts to create complex narrative structures.
- **Agile Methodolgies:** Followed Agile practices, including daily stand-ups, sprint planning, and using project management tools to track progress and prioritize tasks.

## Setting Up the Project
Follow these steps to set up and run the frontend locally:

### 1. Clone the Repository
Close the repository to your local machine using the following command:

```bash
git clone https://github.com/kyunghei/Timeless-Tales.git
cd react-app
```
### 2. Install Dependencies
Install the necessary dependencies using npm or yarn:

```bash
npm install
```
### 3. Run the Development Server
Start the development server using the following command:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

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
