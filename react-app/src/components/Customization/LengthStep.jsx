import PropTypes from 'prop-types';

/**
 * 
 * @param {number} selectedLength Length of story selected by the user, used to keep track of selecion.
 * @param {function} onLengthSelect Passed from parent component to update selected length
 */

function LengthStep({ selectedLength, onLengthSelect }) {

    // Handles changes made to the slider and notifies the parent component.
    const handleChangeLength = (e) => {
        onLengthSelect(parseInt(e.target.value, 10));
    }
    return (
        <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', padding: '20px' }}>
            <h2>How Long Will Your Adventure Last?</h2>
            <label htmlFor="story-length-slider">
                Short
                <input type="range" id="story-length-slider" min="5" max="10" value={selectedLength} onChange={handleChangeLength} />
                Long
            </label>
        </form>

    )
}

export default LengthStep;

LengthStep.propTypes = {
    selectedLength: PropTypes.number.isRequired,
    onLengthSelect: PropTypes.func.isRequired
}