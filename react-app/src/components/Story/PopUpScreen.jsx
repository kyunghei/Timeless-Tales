// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Pop Up Screen Contents
 *  
 */



function PopUpScreen({ handleRestart }) {
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
                handleRestart();
            }
        } catch (error) {
            console.error('Error restarting story with current settings:', error);
        }

    }
    return (
        <>
            <dialog id='popup' open style={{ zIndex: 1000 }}>
                <form method="dialog">
                    <div>
                        <h1>Hey there, Adventurer!</h1>
                        <p>Ready for more action with your current setup, or feeling like a bit of a change this time around?</p>
                        <ul>
                            <li><strong>Stick With it - </strong>Jump right back in with all your current settings!</li>
                            <li><strong>Mix Things Up - </strong>Take the customization quiz again and see what new twists you can add to your adventure!</li>
                        </ul>
                        <div id='popup-button-div' >                        
                            <button className='popup-button' onClick={keepCustomization}>Stick With It</button>
                            <button className='popup-button' onClick={toCustomization}>Mix Things Up</button>
                        </div>

                    </div>
                </form>
            </dialog>
        </>
    );
}

export default PopUpScreen;

PopUpScreen.propTypes = {
    handleRestart: PropTypes.func.isRequired,
}