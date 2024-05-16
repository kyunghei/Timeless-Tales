import PropTypes from 'prop-types';

/**
 * @param {function} onClick Handler that takes user to the next step of the form.
 * @param {boolean} disabled Indicates if button should be disabled or not.
 */
function NextButton({ onClick, disabled }) {
    return (
        <button className='button right-align' onClick={onClick} disabled={disabled}>&gt;</button>
    );

}

export default NextButton;


NextButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}