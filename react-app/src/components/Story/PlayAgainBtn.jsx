import PropTypes from 'prop-types';
import '../../styles/Story/StoryButton.css';

/**
 * Displays button for users to select choice
 * @param {string} genre 
 * @param {func} popUpHandler
 */

function PlayAgainBtn({genre, popUpHandler}){
    const genreStyle = genre.charAt(0).toLowerCase() + genre.slice(1);

    function showDisplay(){
        popUpHandler(true);
    }

    return(
        <>
            <button id="playAgainBtn" className={genreStyle}  onClick={showDisplay}>Play Again?</button>
        </>
    )
}

export default PlayAgainBtn;

PlayAgainBtn.propTypes = {
    genre: PropTypes.string.isRequired,
    popUpHandler: PropTypes.func.isRequired
}