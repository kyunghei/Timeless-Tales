import PropTypes from 'prop-types';

/**
 * Displays the story image.
 * @param {url} imageUrl  
 */
function StoryImage({ imageUrl }) {
    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="Story Image" />}
        </div>
    );
}

export default StoryImage;

StoryImage.propTypes = {
    imageUrl: PropTypes.url.isRequired
}