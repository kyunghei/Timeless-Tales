// Visually indicate which step (genre, length, character) of the form the user is on.
/**
 * Display a progress indicator for the multi-step form.
 * Highlights the box corresponding to the current step.
 * @param {number} currentStep The current step user is on. (1, 2, or 3)
 */
function ProgressIndicator({ currentStep }) {

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <div style={{
                padding: '15px',
                backgroundColor: currentStep === 1 ? 'white' : 'purple',
                color: currentStep === 1 ? 'purple' : 'white',
                fontWeight: 'bold',
                borderRadius: '25px',
                width: '5%',
                textAlign: 'center',
                border: '1px solid purple',
                margin: '0 15px'
            }}>Genre</div>
            <div style={{
                padding: '15px',
                backgroundColor: currentStep === 2 ? 'white' : 'purple',
                color: currentStep === 2 ? 'purple' : 'white',
                fontWeight: 'bold',
                borderRadius: '25px',
                width: '5%',
                textAlign: 'center',
                border: '1px solid purple',
                margin: '0 15px'
            }}>Length</div>
            <div style={{
                padding: '15px',
                backgroundColor: currentStep === 3 ? 'white' : 'purple',
                color: currentStep === 3 ? 'purple' : 'white',
                fontWeight: 'bold',
                borderRadius: '25px',
                width: '5%',
                textAlign: 'center',
                border: '1px solid purple',
                margin: '0 15px'
            }}>Character</div>

        </div >

    );

}

export default ProgressIndicator
