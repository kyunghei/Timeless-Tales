import PropTypes from 'prop-types';
import ProgressBar from "@ramonak/react-progress-bar";

/**
 * Displays the story progress
 * @param {number} currentBeat 
 * @param {number} maxBeat
 */


function StoryProgressBar({ currentBeat, maxBeat }) {

    let progress = Math.round(100 * (currentBeat/maxBeat));
    console.log(progress);

    return (
        <div>
            {/* <p>Progress: {currentBeat} out of {maxBeat}</p> */}
            <ProgressBar completed={progress}/>
        </div>
    );
}

export default StoryProgressBar;

StoryProgressBar.propTypes = {
    currentBeat: PropTypes.number.isRequired,
    maxBeat: PropTypes.number.isRequired,
}