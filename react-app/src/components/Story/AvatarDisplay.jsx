import PropTypes from 'prop-types';

/**
 * Displays the avatar image and name given the character name, genre, and avatar identification number
 * @param {string} name 
 * @param {number} avatar
 * @param {string} genre
 */

const avatars = {
    Western: ['/avatars/western1-250.png', '/avatars/western2-250.webp', '/avatars/western3-250.webp'],
    SciFi: ['/avatars/scifi1-250.webp', '/avatars/scifi2-250.webp', '/avatars/scifi3-250.webp'],
    Fantasy: ['/avatars/fantasy1-250.webp', '/avatars/fantasy2-250.webp', '/avatars/fantasy3-250.webp']
}

function AvatarDisplay({ name, avatar, genre }) {

    const avatarIdx = avatar - 1
    const avatarDisplay = avatars[genre][avatarIdx];

    return (
        <div>
            <div>
                <img src={avatarDisplay} alt="Avatar Image" width='100px' height='100px' />
            </div>
            <div>
                <div>{name}</div>
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