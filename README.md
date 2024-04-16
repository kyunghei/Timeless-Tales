# Timeless Tales

A web application utilizing AI to create custom choose-your-own-adventure stories with dynamic choices/outcomes and relevant artwork.

## Internal Terminology

- **Story Beat**: A single scene of the story, including the image, generated paragraph, and presented choices.

- **Meta-Data**: Internal information used to guide API calls.

- **Choice Tags**: Tags that classify each type of choice. These tags are hidden and help determine how the story progresses based on the user's selections. This may include, modifying number of lives or modifying the next choice schema.

- **Choice Schema**: A collection of choice tags. Assigning a schema to an API call helps it determine what kind of tags to apply when generating choices.
