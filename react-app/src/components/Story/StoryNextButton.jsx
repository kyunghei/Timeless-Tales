import PropTypes from 'prop-types';
import '../../styles/Story/StoryButton.css'

/**
 * Displays the story button given genre and number of lives
 * @param {string} genre 
 * @param {func} nextHandler
 */



function StoryButton({ genre, nextHandler }) {


    const genreStyle = genre.charAt(0).toLowerCase() + genre.slice(1);

    return (
        <>
            <button className={genreStyle} id="storyBtn" onClick={nextHandler}>Story Next</button>
        </>

    );

}

export default StoryButton;

StoryButton.propTypes = {
    genre: PropTypes.string.isRequired,
    nextHandler: PropTypes.func.isRequired
}