import PropTypes from 'prop-types';

/**
 * Displays the story beat text
 * @param {string} text
 */


function StoryBeatText({ text }) {
    console.log("text component");

    return (
        <div>
            {text}
        </div>
    );
}

export default StoryBeatText;

StoryBeatText.propTypes = {
    text: PropTypes.string.isRequired
}