import PropTypes from 'prop-types';
import logo from '../../assets/logo.webp';

/**
 * Represents the character step in the mutli-step customization form.
 * Allows the user to choose an avatar and character name.
 * @param {string} selectedAvatar The avatar currently selected by the user, used to highlight the selected option.
 * @param {Function} onAvatarSelect Passed from parent component to handle avatar selection.
 * @param {string} selectedName The name currently inputted by the user, used to save what user wrote.
 * @param {Function} onNameSelect Passed from parent component to handle character name inputted.
 */
function CharacterStep({ selectedAvatar, onAvatarSelect, selectedName, onNameSelect }) {
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', padding: '20px' }}>
                <h2>Who Will You Be?</h2>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px' }}>
                    <AvatarOption avatar='1' isSelected={selectedAvatar === '1'} onSelectAvatar={onAvatarSelect} />
                    <AvatarOption avatar='2' isSelected={selectedAvatar === '2'} onSelectAvatar={onAvatarSelect} />
                    <AvatarOption avatar='3' isSelected={selectedAvatar === '3'} onSelectAvatar={onAvatarSelect} />
                </div>
                <label htmlFor="character-name">Name:</label>
                <br />
                <input type="text" id="character-name" value={selectedName} onChange={onNameSelect} />
            </form >
        </>
    );
}

/**
 * Displays an avatar option that can be selected.
 * Each option include an avatar image that highlights upon selection.
 * 
 * @param {string} avatar The numerical representation of avatar chosen.
 * @param {boolean} isSelected Shows if this avatar is currently selected or not.
 * @param {function} onSelectAvatar Function that sets the selected avatar
 */
function AvatarOption({ avatar, isSelected, onSelectAvatar }) {
    const style = {
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: isSelected ? '2px solid black' : 'none',
        borderRadius: '5px',
        fontSize: '25px'
    }
    return (
        <>
            <div style={style} onClick={() => onSelectAvatar(avatar)}>
                <img src={logo} alt="avatar option" width='300px' height='300px' />
            </div>

        </>

    );
}


export default CharacterStep;

CharacterStep.propTypes = {
    selectedAvatar: PropTypes.string.isRequired,
    onAvatarSelect: PropTypes.func.isRequired,
    selectedName: PropTypes.string.isRequired,
    onNameSelect: PropTypes.func.isRequired
}

AvatarOption.propTypes = {
    avatar: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectAvatar: PropTypes.func.isRequired
}