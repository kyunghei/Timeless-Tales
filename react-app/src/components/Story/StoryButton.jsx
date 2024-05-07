import PropTypes from 'prop-types';
import '../../styles/Story/StoryButton.css'

/**
 * Displays the story button given genre and number of lives
 * @param {string} genre 
 * @param {number} lives
 */



function StoryButton({ genre, lives }) {

    let buttonDisplay;

    const genreStyle = genre.charAt(0).toLowerCase() + genre.slice(1);


    if(lives == 0){
        buttonDisplay = <button className={genreStyle}>Play Again?</button>
        //onclick
        //  #1 Alert Box asking if we would like to play again or end game
        //  #2a playagain & don't keep customization, Navigate to Customization Page
        //  #2b playagain & keep customization,Navigate to Story with lives = 3, current_beat = 1
        //  #3 End Game, Navigate to Home Page
    }
    else{
        buttonDisplay = <button className={genreStyle}>Next</button>
        //on click
        //  #1 display choices
        //  #2 display gpt choices image
    }

    return (
        <div>
            {buttonDisplay}
        </div>
    );

}

export default StoryButton;

StoryButton.propTypes = {
    genre: PropTypes.string.isRequired,
    lives: PropTypes.number.isRequired
}