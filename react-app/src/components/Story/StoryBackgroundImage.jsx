import PropTypes from 'prop-types';

/**
 * Displays the story background image given genre
 * @param {string} genre 
 */

const background = {
    Western: '/background/western-bg.png',
    SciFi: '/background/scifi-bg.png',
    Fantasy: '/background/fantasy-bg.png'
}

function StoryBackgroundImage({ genre }) {

    const imageBgUrl = background[genre];

    return (
        <div>
            <img src={imageBgUrl} alt="Story Background Image" />
        </div>
    );
}

export default StoryBackgroundImage;

StoryBackgroundImage.propTypes = {
    genre: PropTypes.string.isRequired
}