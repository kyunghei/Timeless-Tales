import PropTypes from 'prop-types';

/**
 * Displays the story beat text
 * @param {string} story
 */


function StoryBeatText({ story }) {
    console.log("text component");

    return (
        <div>
            {story}
        </div>
    );
}

export default StoryBeatText;

StoryBeatText.propTypes = {
    story: PropTypes.string.isRequired
}