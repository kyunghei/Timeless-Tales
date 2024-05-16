// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

/**
 * Pop Up Screen Contents
 *  
 */



function PopUpScreen() {
    //onclick
    //  #1 Alert Box asking if we would like to play again or end game
    //  #2a playagain & don't keep customization, Navigate to Customization Page
    //  #2b playagain & keep customization,Navigate to Story with lives = 3, current_beat = 1
    //  #3 End Game, Navigate to Home Page
    const navigate = useNavigate();

    function toCustomization(){
        navigate('/customization')
        //communicate with backend that we are restarting from beginning
    }

    function keepCustomization(){
        //pass prop to parent that game is not over
        //close popup
        //parent must send backend the same customization choices, Story with lives = 3, current_beat = 1
        console.log("keeping customization choices")
    }
    return (
        <>
            <div>
                <div>Hey there, Adventurer!</div>
                <div>Ready for more action with your current setup, or feeling like a bit of a change this time around?</div>
                <div>
                    <span>Stick With it -</span>
                    <span>Just right back in with all your current settings!</span>
                </div>
                <div>
                    <span>Mix Things Up -</span>
                    <span>Take the customization quiz again and see what new twists you can add to your adventure!</span>
                </div>
                <button onClick={keepCustomization}>Stick With It</button>
                <button onClick={toCustomization}>Mix Things Up</button>

            </div>
        </>

    );

}

export default PopUpScreen;

