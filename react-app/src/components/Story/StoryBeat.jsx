import PropTypes from 'prop-types';

/**
 * Display the text of the story beat.
 * @param {string} text The text of the story beat. 
 */
function StoryBeat({ text }) {
    return (
        <p>{text}</p>
    );
}

export default StoryBeat;

StoryBeat.propTypes = {
    text: PropTypes.string.isRequired
}