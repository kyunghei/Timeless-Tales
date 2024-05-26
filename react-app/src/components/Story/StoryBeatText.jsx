import PropTypes from 'prop-types';

/**
 * Displays the story beat text
 * @param {string} text
 */


function StoryBeatText({ text }) {

    return (
        <div id='storybeat-text'>
            {text}
        </div>
    );
}

export default StoryBeatText;

StoryBeatText.propTypes = {
    text: PropTypes.string.isRequired
}