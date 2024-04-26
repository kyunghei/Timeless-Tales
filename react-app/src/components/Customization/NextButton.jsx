import PropTypes from 'prop-types';

/**
 * 
 * @param {function} onClick Handler that takes user to the next step of the form.
 * @param {boolean} [disabled=false] Indicates if button should be disabled or not.
 * @returns 
 */
function NextButton({ onClick, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled}>Next</button>
    );

}

export default NextButton;


NextButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}