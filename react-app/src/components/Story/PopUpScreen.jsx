import PropTypes from 'prop-types';

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
                <button>Stick With It</button>
                <button>Mix Things Up</button>

            </div>
        </>

    );

}

export default PopUpScreen;

