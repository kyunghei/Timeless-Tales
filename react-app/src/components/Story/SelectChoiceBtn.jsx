import PropTypes from 'prop-types';
import '../../styles/Story/StoryButton.css';

/**
 * Displays button for users to select choice
 * @param {string} genre 
 * @param {func} nextHandler
 */

function SelectChoiceBtn({genre,nextHandler}){
    const genreStyle = genre.charAt(0).toLowerCase() + genre.slice(1);

    return(
        <>
            <button id="selectChoiceBtn" className={genreStyle} onClick={nextHandler}>Select Choice</button>
        </>
    )
}

export default SelectChoiceBtn;

SelectChoiceBtn.propTypes = {
    genre: PropTypes.string.isRequired,
    nextHandler: PropTypes.func.isRequired,
}