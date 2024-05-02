import PropTypes from 'prop-types';

/**
 * 
 * @param {number} selectedLength Length of story selected by the user, used to keep track of selecion.
 * @param {function} onLengthSelect Passed from parent component to update selected length
 */

function LengthStep({ selectedLength, onLengthSelect }) {
    function style(length) {
        return {
            padding: '15px',
            backgroundColor: selectedLength === length ? 'black' : 'transparent',
            color: selectedLength === length ? 'white' : 'black'
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', padding: '20px' }}>
            <h2>How Long Will Your Adventure Last?</h2>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px' }}>
                <button style={style(4)} onClick={() => onLengthSelect(4)}>Short</button>
                <button style={style(8)} onClick={() => onLengthSelect(8)}>Medium</button>
                <button style={style(12)} onClick={() => onLengthSelect(12)}>Long</button>
            </div>
        </form>

    )
}


export default LengthStep;

LengthStep.propTypes = {
    selectedLength: PropTypes.string.isRequired,
    onLengthSelect: PropTypes.func.isRequired
}
