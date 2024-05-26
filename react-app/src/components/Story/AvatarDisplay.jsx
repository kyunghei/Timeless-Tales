import PropTypes from 'prop-types';
import '../../styles/Story/Avatar.css';

/**
 * Displays the avatar image and name given the character name, genre, and avatar identification number
 * @param {string} name 
 * @param {number} avatar
 * @param {string} genre
 */

const avatars = {
    Western: ['/avatars/western1-250.png', '/avatars/western2-250.png', '/avatars/western3-250.png'],
    SciFi: ['/avatars/scifi1-250.png', '/avatars/scifi2-250.png', '/avatars/scifi3-250.png'],
    Fantasy: ['/avatars/fantasy1-250.png', '/avatars/fantasy2-250.png', '/avatars/fantasy3-250.png']
}

function AvatarDisplay({ name, avatar, genre }) {

    const avatarIdx = avatar;
    const avatarDisplay = avatars[genre][avatarIdx];
    const genreStyle = genre.charAt(0).toLowerCase() + genre.slice(1);

    return (
        <div id='avatar-container' className={genreStyle}>
            <div>
                <img src={avatarDisplay} alt="Avatar Image" id='avatar-image' className={genreStyle} />
            </div>
            <div>
                <div id='avatar-name' className={genreStyle} >{name}</div>
            </div>
        </div>
    );
}

export default AvatarDisplay;

AvatarDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired
}