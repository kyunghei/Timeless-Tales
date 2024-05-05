import PropTypes from 'prop-types';

/**
 * Displays the avatar image and name given the character name, genre, and avatar identification number
 * @param {string} name 
 * @param {number} avatar
 * @param {string} genre
 */

const avatars = {
    Western: ['/avatars/western1.webp', '/avatars/western2.webp', '/avatars/western3.webp'],
    SciFi: ['/avatars/scifi1.webp', '/avatars/scifi2.webp', '/avatars/scifi3.webp'],
    Fantasy: ['/avatars/fantasy1.webp', '/avatars/fantasy2.webp', '/avatars/fantasy3.webp']
}

function AvatarDisplay({name, avatar, genre}) {

    const avatarDisplay = avatars[genre][avatar];

    return (
        <div>
            <div>
                <img src={avatarDisplay} alt="Avatar Image" />
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