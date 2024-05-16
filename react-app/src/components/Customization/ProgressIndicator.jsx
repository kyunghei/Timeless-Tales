import PropTypes from 'prop-types';

/**
 * Display a progress indicator for the multi-step form.
 * Highlights the box corresponding to the current step.
 * @param {number} currentStep The current step user is on. (1, 2, or 3)
 */
function ProgressIndicator({ currentStep }) {

    return (
        <div className='progress' >
            <div className='progress-step left-curve' style={{
                backgroundColor: currentStep === 1 ? 'white' : 'purple',
                color: currentStep === 1 ? 'purple' : 'white',
                borderColor: currentStep === 1 ? 'purple' : 'transparent'
            }}>Genre</div>
            
            <div className='progress-step' style={{
                backgroundColor: currentStep === 2 ? 'white' : 'purple',
                color: currentStep === 2 ? 'purple' : 'white',
                borderLeftColor: currentStep === 3 ? 'white' : 'transparent',
                borderRightColor: currentStep === 1 ? 'white' : 'transparent'
            }}>Length</div>
            
            <div className='progress-step right-curve' style={{
                backgroundColor: currentStep === 3 ? 'white' : 'purple',
                color: currentStep === 3 ? 'purple' : 'white',
                borderColor: currentStep === 3 ? 'purple': 'transparent'
            }}>Character</div>

        </div >

    );

}

export default ProgressIndicator

ProgressIndicator.propTypes = {
    currentStep: PropTypes.number.isRequired
}