import PropTypes from 'prop-types';
import '../../styles/Story/StoryButton.css';

/**
 * Displays button for users to select choice
 * @param {string} genre 
 * @param {string} userChoice 
 * @param {func} nextHandler
 */

function SelectChoiceBtn({genre, userChoice, nextHandler}){
    const genreStyle = genre.charAt(0).toLowerCase() + genre.slice(1);

    console.log(userChoice);
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
    userChoice: PropTypes.string.isRequired
}