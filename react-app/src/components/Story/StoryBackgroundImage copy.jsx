import PropTypes from 'prop-types';

/**
 * Displays the story image.
 * @param {url} imageUrl  
 */
function StoryBackgroundImage({ imageUrl }) {
    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="Story Image" />}
        </div>
    );
}

export default StoryBackgroundImage;

StoryBackgroundImage.propTypes = {
    imageUrl: PropTypes.url.isRequired
}