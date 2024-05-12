import PropTypes from 'prop-types';

/**
 * Displays the story progress
 * @param {number} currentBeat 
 * @param {number} maxBeat
 */


function ProgressBar({ currentBeat, maxBeat }) {


    return (
        <div>
            <p>Progress: {currentBeat} out of {maxBeat}</p>
        </div>
    );
}

export default ProgressBar;

ProgressBar.propTypes = {
    currentBeat: PropTypes.number.isRequired,
    maxBeat: PropTypes.number.isRequired,
}