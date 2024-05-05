import PropTypes from 'prop-types';

/**
 * Displays the avatar image and name given the character name, genre, and avatar identification number
 * @param {number} lives
 * @param {string} genre
 */

const health = {
    Western: '/healthbars/westernHealth.png',
    Scifi: '/healthbars/westernHealth.png',
    Fantasy: '/healthbars/westernHealth.png'
}

const healthLost = {
    Western: '/healthbars/westernHealthLost.png',
    Scifi: '/healthbars/westernHealthLost.png',
    Fantasy: '/healthbars/westernHealthLost.png'
}

function AvatarLife({genre, lives}) {

    const maxHealth = 3;

    const healthDisplay = health[genre];
    const healthLostDisplay = healthLost[genre];

    const healthBarDisplay = [];

    for (let i=0; i < maxHealth; i++){
        if (i < lives){
            healthBarDisplay.push(<img key={i+1} src={healthDisplay} alt="Avatar One Life" />)
        }
        else{
            healthBarDisplay.push(<img key={i+1} src={healthLostDisplay} alt="Avatar One Life Lost" />)
        }
    }

    return (
        <div>
            {healthBarDisplay}
        </div>

    );
}

export default AvatarLife;

AvatarLife.propTypes = {
    lives: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired
}