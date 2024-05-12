import PropTypes from 'prop-types';

/**
 * Displays the story beat choices
 * @param {string} choices 
 */


function StoryBeatChoices() {

    let choice1;
    let choice2;
    let choice3;

    return (
        <div>
            <select name="choices" id="choices">
                <option value="1">{choice1}</option>
                <option value="2">{choice2}</option>
                <option value="3">{choice3}</option>
            </select>
        </div>
    );
}

export default StoryBeatChoices;

StoryBeatChoices.propTypes = {
    choices: PropTypes.string.isRequired,
}