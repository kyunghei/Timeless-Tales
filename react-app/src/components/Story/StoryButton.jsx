import PropTypes from 'prop-types';
import {useState} from 'react';
import '../../styles/Story/StoryButton.css'

/**
 * Displays the story button given genre and number of lives
 * @param {string} genre 
 * @param {number} lives
 * @param {boolean} show
 */



function StoryButton({ genre, lives, popUpHandler }) {

    let buttonDisplay;

    const genreStyle = genre.charAt(0).toLowerCase() + genre.slice(1);

    function showDisplay(){
        popUpHandler(true);
    }


    if(lives == 0){
        buttonDisplay = <button className={genreStyle} id="gameOverBtn" onClick={showDisplay}>Play Again?</button>
    }
    else{
        buttonDisplay = <button className={genreStyle} id="storyNextBtn">Next</button>
        //on click
        //  #1 display choices
        //  #2 display gpt choices image
    }


    return (
        <>
            <div>
                {buttonDisplay}
            </div>
        </>

    );

}

export default StoryButton;

StoryButton.propTypes = {
    genre: PropTypes.string.isRequired,
    lives: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired
}