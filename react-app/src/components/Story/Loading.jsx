import PropTypes from 'prop-types';

/**
 * Displays the loading screen
 * @param {number} currentBeat 
 * @param {number} maxBeat
 */


function Loading({ currentBeat, maxBeat }) {


    return (
        <div>
            <h1>Loading...</h1>
            <p>Currently {currentBeat} out of {maxBeat}!</p>
        </div>
    );
}

export default Loading;

Loading.propTypes = {
    currentBeat: PropTypes.number.isRequired,
    maxBeat: PropTypes.number.isRequired,
}