import PropTypes from 'prop-types';

/**
 * @param {function} onClick Handler that takes user to the previous step of the form.
 * @param {boolean} disabled Indicates if button should be disabled or not.
 */
function PreviousButton({ onClick, disabled }) {
    return (
        <button className='button left-align' onClick={onClick} disabled={disabled}>&lt;</button>
    );
}

export default PreviousButton;

PreviousButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}