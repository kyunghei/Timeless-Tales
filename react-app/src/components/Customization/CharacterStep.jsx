import PropTypes from 'prop-types';

// Map genre to respective avatar image paths
const avatars = {
    Western: ['/avatars/western1.png', '/avatars/western2.webp', '/avatars/western3.webp'],
    SciFi: ['/avatars/scifi1.webp', '/avatars/scifi2.webp', '/avatars/scifi3.webp'],
    Fantasy: ['/avatars/fantasy1.webp', '/avatars/fantasy2.webp', '/avatars/fantasy3.webp']
}

/**
 * Represents the character step in the mutli-step customization form.
 * Allows the user to choose an avatar and character name.
 * @param {string} selectedGenre User selected genre which will determine which avatars to display.
 * @param {number} selectedAvatar The avatar index currently selected by the user, used to highlight the selected option. 0 = Avatar1, 1 = Avatar2, 2 = Avatar3
 * @param {Function} onAvatarSelect Passed from parent component to handle avatar selection.
 * @param {string} selectedName The name currently inputted by the user, used to save what user wrote.
 * @param {Function} onNameSelect Passed from parent component to handle character name inputted.
 */
function CharacterStep({ selectedGenre, selectedAvatar, onAvatarSelect, selectedName, onNameSelect }) {

    // Get the three avatars based on user select genre 
    const genreAvatars = avatars[selectedGenre];

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', padding: '20px' }}>
                <h2>Who Will You Be?</h2>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px' }}>
                    <AvatarOption avatar={genreAvatars[0]} isSelected={selectedAvatar === 0} onSelectAvatar={() => onAvatarSelect(0)} />
                    <AvatarOption avatar={genreAvatars[1]} isSelected={selectedAvatar === 1} onSelectAvatar={() => onAvatarSelect(1)} />
                    <AvatarOption avatar={genreAvatars[2]} isSelected={selectedAvatar === 2} onSelectAvatar={() => onAvatarSelect(2)} />
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
 * @param {string} avatar The URL path of the avatar image.
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
            <div style={style} onClick={onSelectAvatar}>
                <img src={avatar} alt="avatar option" width='300px' height='300px' />
            </div>

        </>

    );
}


export default CharacterStep;

CharacterStep.propTypes = {
    selectedGenre: PropTypes.string.isRequired,
    selectedAvatar: PropTypes.number.isRequired,
    onAvatarSelect: PropTypes.func.isRequired,
    selectedName: PropTypes.string.isRequired,
    onNameSelect: PropTypes.func.isRequired
}

AvatarOption.propTypes = {
    avatar: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectAvatar: PropTypes.func.isRequired
}