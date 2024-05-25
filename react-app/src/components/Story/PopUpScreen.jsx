// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    // Access backend URL from env
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    function toCustomization() {
        navigate('/customization')
    }

    async function keepCustomization() {

        // TEST
        console.log("keeping customization choices")

        try {
            const res = await axios.post(`${BACKEND_URL}/restart`);
            if (res.status === 200) {
                // navigating will refresh the states within 'StoryPage' to its original default values when remounted.
                navigate('/story');
            }
        } catch (error) {
            console.error('Error restarting story with current settings:', error);
        }

    }
    return (
        <>
            <dialog open>
                <form method="dialog">
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
                </form>
            </dialog>
        </>

    );

}

export default PopUpScreen;

