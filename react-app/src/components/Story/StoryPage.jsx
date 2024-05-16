import StoryBeatText from './StoryBeatText';
import StoryBackgroundImage from './StoryBackgroundImage';
import StoryBeatImage from './StoryBeatImage';
import AvatarDisplay from './AvatarDisplay';
import StoryNextButton from './StoryNextButton';
import AvatarLife from './AvatarLife';
import ProgressBar from './ProgressBar';
import PopUpScreen from './PopUpScreen';
import SelectChoiceBtn from './SelectChoiceBtn';
import PlayAgainBtn from './PlayAgainBtn';
import StoryBeatChoices from './StoryBeatChoices';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


function StoryPage({ selectedGenre, selectedName, selectedAvatar, selectedLength }) {

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

    // Fetch first story beat data from backend when component mounts.
    useEffect(() => {
        setIsLoading(true); // Loading before sending request

        async function fetchFirstBeat() {
            try {
                const res = await axios.post('/post-story-beat');
                setCurrentBeatData(res.data);
                setIsLoading(false); // Remove loading after receipt of data
            } catch (error) {
                console.error('Error fetching first story beat:', error);
                setIsLoading(false);
            }
        }
        fetchFirstBeat();
    }, []);


    function handleNext() {
        setShowChoices(!showChoices);
    }

    function handlePopUp(){
        setShowGameOver(!showGameOver);
    }

    function handleUserChoice(user_choice){
        setUserChoice(user_choice);
    }

    function handleSendUserChoice(){
        //TEST: verify sending correct user choice
        console.log(`Sending ${userChoice} to backend`);

        //buffer while we send user choice to backend and start new story beat
        setIsLoading(true);

        //TEST: automatically switch buttons
        setShowChoices(!showChoices);
    }

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {/* Static info display */}
                    <StoryBackgroundImage genre={currentBeatData.genre} />
                    <AvatarDisplay name={selectedName} avatar={selectedAvatar} genre={selectedGenre} />

                    {/* Update beginning of story beat */}
                    <AvatarLife genre={selectedGenre} lives={currentBeatData.current_lives} />
                    <StoryBeatImage imageUrl={currentBeatData.story_image} />
                    {showChoices ? 
                    <StoryBeatChoices choices={[currentBeatData.choice_1, currentBeatData.choice_2, currentBeatData.choice_3]} userChoiceHandler={handleUserChoice}/> : 
                    <StoryBeatText story={currentBeatData.story_text}/>}
                    <ProgressBar currentBeat={currentBeatData.current_beat} maxBeat={selectedLength} />

                    {/* Displays correct button */}
                    {currentBeatData.current_lives == 0 ? 
                    <PlayAgainBtn genre={selectedGenre} popUpHandler={handlePopUp}/> : null}
                    {currentBeatData.current_lives != 0 && showChoices ? 
                    <SelectChoiceBtn genre={selectedGenre} userChoice = {userChoice} nextHandler={handleSendUserChoice}/> : null}
                    {currentBeatData.current_lives != 0 && !showChoices ? 
                    <StoryNextButton genre={selectedGenre} nextHandler={handleNext} /> : null}

                    {/* Displays pop up screen */}
                    {showGameOver? <PopUpScreen/> : null}
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
    selectedLength: PropTypes.number.isRequired
}