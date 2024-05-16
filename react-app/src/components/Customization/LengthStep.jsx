import PropTypes from 'prop-types';

/**
 * 
 * @param {number} selectedLength Length of story selected by the user, used to keep track of selecion.
 * @param {function} onLengthSelect Passed from parent component to update selected length
 */

function LengthStep({ selectedLength, onLengthSelect }) {
    return (
        <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', padding: '20px' }}>
            <h2>How Long Will Your Adventure Last?</h2>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px' }}>
                <div className='custom' onClick={() => onLengthSelect(4)}>
                    <button className='button' style={{
                        backgroundColor: selectedLength === 4 ? 'purple' : selectedLength === 8 ? 'purple' : selectedLength === 12 ? 'purple' : 'white',
                        border: selectedLength === 4 ? 'transparent' : selectedLength === 8 ? 'transparent' : selectedLength === 12 ? 'transparent' : ' purple',
                    }} ></button>
                    <div>Short</div>
                </div>
                <button className='button custom' style={{
                        backgroundColor: selectedLength === 4 ? 'purple' : selectedLength === 8 ? 'purple' : selectedLength === 12 ? 'purple' : 'white',
                        border: selectedLength === 4 ? 'transparent' : selectedLength === 8 ? 'transparent' : selectedLength === 12 ? 'transparent' : ' purple',
                    }} onClick={() => onLengthSelect(4)}></button>
                
                <button className='button custom' style={{
                        backgroundColor: selectedLength === 8 ? 'purple' : selectedLength === 12 ? 'purple' : 'white',
                        border: selectedLength === 8 ? 'transparent' : selectedLength === 12 ? 'transparent' : 'purple',
                        color: selectedLength === 8 ? 'white' : selectedLength === 12 ? 'white' : 'black'
                    }} onClick={() => onLengthSelect(8)}></button>
                <div className='custom' onClick={() => onLengthSelect(8)}>
                    <button className='button' style={{
                        backgroundColor: selectedLength === 8 ? 'purple' : selectedLength === 12 ? 'purple' : 'white',
                        border: selectedLength === 8 ? 'transparent' : selectedLength === 12 ? 'transparent' : 'purple',
                    }}></button>
                    <div>Medium</div>                    
                </div>
                <button className='button custom' style={{
                        backgroundColor: selectedLength === 8 ? 'purple' : selectedLength === 12 ? 'purple' : 'white',
                        border: selectedLength === 8 ? 'transparent' : selectedLength === 12 ? 'transparent' : 'purple',
                        color: selectedLength === 8 ? 'white' : selectedLength === 12 ? 'white' : 'black'
                    }} onClick={() => onLengthSelect(8)}></button>
                
                <button className='button custom' style={{
                        backgroundColor: selectedLength === 12 ? 'purple' : 'white',
                        border: selectedLength === 12 ? 'transparent' : 'purple',
                    }} onClick={() => onLengthSelect(12)}></button>
                <div className='custom' onClick={() => onLengthSelect(12)}>
                    <button className='button' style={{
                        backgroundColor: selectedLength === 12 ? 'purple' : 'white',
                        border: selectedLength === 12 ? 'transparent' : 'purple',
                    }}></button>
                    <div>Long</div>
                </div>



            </div>
        </form>

    )
}


export default LengthStep;

LengthStep.propTypes = {
    selectedLength: PropTypes.number.isRequired,
    onLengthSelect: PropTypes.func.isRequired
}
