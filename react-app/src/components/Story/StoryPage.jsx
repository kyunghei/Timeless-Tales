import StoryBeatText from './StoryBeatText';
import StoryBackgroundImage from './StoryBackgroundImage';
import StoryBeatImage from './StoryBeatImage';
import AvatarDisplay from './AvatarDisplay';
import StoryNextButton from './StoryNextButton';
import AvatarLife from './AvatarLife';
import StoryProgressBar from './StoryProgressBar';
import PopUpScreen from './PopUpScreen';
import SelectChoiceBtn from './SelectChoiceBtn';
import PlayAgainBtn from './PlayAgainBtn';
import StoryBeatChoices from './StoryBeatChoices';
import Loading from './Loading';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../../styles/Story/StorybeatContainer.css';

function StoryPage({ selectedGenre, selectedName, selectedAvatar, selectedLength, handleRestart, resetCustomization }) {

    // State to save the current story beat data (story_text, story_image, current_beat, current_lives) sent from backend
    const [currentBeatData, setCurrentBeatData] = useState(null);

    // State to track loading status
    const [isLoading, setIsLoading] = useState(true);

    // Bool state that controls whether to show story text or story choices
    const [showChoices, setShowChoices] = useState(false);

    // Bool state for pop up display
    const [showGameOver, setShowGameOver] = useState(false);

    // State to track user's answer choice
    const [userChoice, setUserChoice] = useState("");

    // State to store error message and the context 
    const [error, setError] = useState({ message: "", context: null });

    // Used to handle re-renders when using React Strict Mode
    const firstMount = useRef(true);

    // Access backend URL from env
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    // Genre as a string to be used as class name for unique genre-based styling
    const genreStyle = selectedGenre.charAt(0).toLowerCase() + selectedGenre.slice(1);

    // Defined using useCallback to memoize it
    // This function fetches the first story beat from the backend
    const fetchFirstBeat = useCallback(async () => {
        setIsLoading(true); // Loading before sending request
        try {
            const res = await axios.get(`${BACKEND_URL}/story`);
            setCurrentBeatData(res.data);
        } catch (error) {
            console.error('Error fetching first story beat:', error);
            setError({ message: "Error fetching story", context: "fetchFirstBeat" })
        }
        finally {
            setIsLoading(false); // Remove loading after receipt of data or error
        }
    }, [BACKEND_URL]);

    // Fetch first story beat data from backend when component mounts.
    useEffect(() => {
        if (firstMount.current) {
            firstMount.current = false;
            fetchFirstBeat();
        }
    }, [fetchFirstBeat]);


    // Fetch the next story beat
    async function fetchNextBeat() {
        try {
            const res = await axios.get(`${BACKEND_URL}/next-beat`);
            setCurrentBeatData(res.data);
        } catch (error) {
            console.error('Error fetching next story beat:', error);
            setError({ message: "Error fetching story", context: "fetchNextBeat" })
        } finally {
            setIsLoading(false);
        }
    }

    // Handle user choice submission
    async function handleSendUserChoice() {
        //STORYPAGE ONLY: buffer while we send user choice to backend and start new story beat
        setIsLoading(true);

        const formData = {
            user_choice: userChoice
        }

        //TEST: verify sending correct user choice
        console.log(`Sending ${formData.user_choice} to backend`);

        //POST REQUEST
        try {
            const res = await axios.post(`${BACKEND_URL}/user-choice`, formData);

            if (res.status === 200) {
                console.log("form submission successful");

                // Fetch the next story beat
                await fetchNextBeat();

            } else {
                console.error("Couldn't post form data with user choice:", res.status);
            }
        } catch (error) {
            console.error("Error submitting the form data");
            setError({ message: "Error submitting customization", context: "handleUserChoice" })
        } finally {
            setIsLoading(false);
        }


        //TEST: automatically switch buttons
        setShowChoices(!showChoices);
    }


    function handleNext() {
        setShowChoices(!showChoices);
    }

    function handlePopUp() {
        setShowGameOver(!showGameOver);
    }

    function handleUserChoice(user_choice) {
        setUserChoice(user_choice);
        //TEST: verify user selection is saved
        console.log(`setting user choice to ${user_choice}`)
    }

    // retry function that checks the context and call the correct function based on context
    function retry() {
        if (!error.context) return;

        setError({ message: "", context: null }); //Reset error state before retrying

        if (error.context === "fetchFirstBeat") {
            fetchFirstBeat();
        } else if (error.context === "fetchNextBeat") {
            fetchNextBeat();
        } else if (error.context === "handleUserChoice") {
            handleUserChoice();
        }
    }

    return (
        <>
            {isLoading ? (
                <div>
                    <Loading currentBeat={currentBeatData?.current_beat ?? -1} maxBeat={selectedLength} />
                </div>
            ) : error.context ? (
                <div>
                    {error.message}
                    <button onClick={retry}>Retry</button>
                </div>
            ) : (
                <div className='story-container' >
                    {/* Static info display */}
                    <StoryBackgroundImage genre={selectedGenre} />
                    <AvatarDisplay name={selectedName} avatar={selectedAvatar} genre={selectedGenre} />

                    {/* Update beginning of story beat */}
                    <StoryProgressBar currentBeat={currentBeatData.current_beat} maxBeat={selectedLength} />
                    <AvatarLife genre={selectedGenre} lives={currentBeatData.current_lives} />

                    <div id='storybeat-container' className={genreStyle} >
                        <div id='storybeat-text-container' className={genreStyle} >
                            {showChoices ?
                                <StoryBeatChoices choices={[currentBeatData.choice_1, currentBeatData.choice_2, currentBeatData.choice_3]} userChoiceHandler={handleUserChoice} /> :
                                <StoryBeatText text={currentBeatData.story_text} />}
                        </div>
                        <div id='storybeat-image-container' className={genreStyle} >
                            <StoryBeatImage imageUrl={currentBeatData.story_image} />
                            {/* Displays correct button */}
                            {currentBeatData.current_lives == 0 || currentBeatData.current_beat == selectedLength ?
                                <PlayAgainBtn genre={selectedGenre} popUpHandler={handlePopUp} /> : null}
                            {currentBeatData.current_lives != 0 && showChoices && currentBeatData.current_beat != selectedLength ?
                                <SelectChoiceBtn genre={selectedGenre} userChoice={userChoice} nextHandler={handleSendUserChoice} /> : null}
                            {currentBeatData.current_lives != 0 && !showChoices && currentBeatData.current_beat != selectedLength ?
                                <StoryNextButton genre={selectedGenre} nextHandler={handleNext} /> : null}
                        </div>
                    </div>

                    {/* Displays pop up screen */}
                    {showGameOver ? <PopUpScreen handleRestart={handleRestart} resetCustomization={resetCustomization} /> : null}
                </div>
            )}

        </>

    );
}

export default StoryPage;

StoryPage.propTypes = {
    selectedGenre: PropTypes.string.isRequired,
    selectedAvatar: PropTypes.number.isRequired,
    selectedName: PropTypes.string.isRequired,
    selectedLength: PropTypes.number.isRequired,
    handleRestart: PropTypes.func.isRequired,
    resetCustomization: PropTypes.func.isRequired
}