import PropTypes from 'prop-types';

/**
 * Displays the story button given genre and number of lives
 * @param {string} genre 
 * @param {number} lives
 */



function StoryButton({ genre, lives }) {

    const buttonDisplay = [];

    if(lives == 0){
        buttonDisplay.push(<button key={0}>Play Again?</button>)
    }
    else{
        buttonDisplay.push(<button key={0}>Next</button>)
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