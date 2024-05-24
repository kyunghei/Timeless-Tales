import PropTypes from 'prop-types';

/**
 * Displays the story beat image given imageUrl
 * @param {string} imageUrl 
 */


function StoryBeatImage({ imageUrl }) {

    return (
        <div>
            <img src={imageUrl} alt="Story Beat Image" className='storybeat-image' />
        </div>
    );
}

export default StoryBeatImage;

StoryBeatImage.propTypes = {
    imageUrl: PropTypes.string.isRequired
}