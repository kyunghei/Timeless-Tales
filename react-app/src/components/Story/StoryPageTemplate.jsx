// import StoryBeat from './StoryBeat';
import StoryBeatText from './StoryBeatText';
import StoryBeatImage from './StoryBeatImage';
import StoryNextButton from './StoryNextButton';
import StoryBackgroundImage from './StoryBackgroundImage';
import AvatarDisplay from './AvatarDisplay';
import AvatarLife from './AvatarLife';
import StoryProgressBar from './StoryProgressBar';
import PopUpScreen from './PopUpScreen';
import SelectChoiceBtn from './SelectChoiceBtn';
import PlayAgainBtn from './PlayAgainBtn';
import StoryBeatChoices from './StoryBeatChoices';
import { useState } from 'react';
import axios from 'axios';

function StoryPageTemplate() {

    // // State to save the current story beat data (text, possible choices, images) sent from backend
    const [currentBeatData, setCurrentBeatData] = useState({
        avatar: 3,
        genre: "Fantasy",
        name: "Doobs",
        current_lives: 0,
        story_text: 
        "velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus",
        choice_1: "This is choice 1",
        choice_2: "This is choice 2",
        choice_3: "This is choice 3",
        max_beat: 12,
        current_beat: 2,
        story_image: "https://drlauravarnam.files.wordpress.com/2018/06/you-got-this-meme.jpg",
        //choices
    });



    // boolean to determine pop up display
    const [showGameOver, setShowGameOver] = useState(false);

    // Bool state that controls whether to show story text or story choices
    const [showChoices, setShowChoices] = useState(false);

    const [userChoice, setUserChoice] = useState("");

    // linting errors
    console.log(setCurrentBeatData);


    function handlePopUp(){
        setShowGameOver(!showGameOver);
    }

    function handleNext() {
        setShowChoices(!showChoices);
    }

    function handleUserChoice(user_choice){
        setUserChoice(user_choice);
        console.log(`setting user choice to ${user_choice}`)
    }

    // async function handleSendUserChoice(){
    //     const formData = {
    //         user_choice: userChoice
    //     }

    //     //TEST: verify sending correct user choice
    //     console.log(`Sending ${formData.user_choice} to backend`);

    //     //POST REQUEST
    //     try {
    //         const res = await axios.post('http://localhost:5172/user-choice', formData);

    //         if (res.status === 200) {
    //             console.log("form submission successful");
    //             //STORYPAGE ONLY: buffer while we send user choice to backend and start new story beat
    //             //setIsLoading(true);
    //         } else {
    //             console.error("Couldn't post form data with user choice:", res.status);
    //         }
    //     } catch (error) {
    //         console.error("Error submitting the form data");
    //     }

    //     //TEST: automatically switch buttons
    //     setShowChoices(!showChoices);
    // }


    return (
        <div>
            {/* Static info display */}
            <StoryBackgroundImage genre={currentBeatData.genre} />
            <AvatarDisplay name ={currentBeatData.name} avatar={currentBeatData.avatar} genre={currentBeatData.genre}/>
            

            {/* Update beginning of story beat */}
            <AvatarLife genre={currentBeatData.genre} lives={currentBeatData.current_lives}/>
            <StoryBeatImage imageUrl={currentBeatData.story_image}/>
            {showChoices? 
            <StoryBeatChoices choices={[currentBeatData.choice_1, currentBeatData.choice_2, currentBeatData.choice_3]} userChoiceHandler={handleUserChoice}/> : 
            <StoryBeatText text={currentBeatData.story_text}/>}
            <StoryProgressBar currentBeat={currentBeatData.current_beat} maxBeat={currentBeatData.max_beat}/>

            {/* Displays correct button */}
            {currentBeatData.current_lives == 0 ? 
            <PlayAgainBtn genre={currentBeatData.genre} popUpHandler={handlePopUp}/> : null}
            {currentBeatData.current_lives != 0 && showChoices ? 
            <SelectChoiceBtn genre={currentBeatData.genre} nextHandler={handleSendUserChoice}/> : null}
            {currentBeatData.current_lives != 0 && !showChoices ? 
            <StoryNextButton genre={currentBeatData.genre} nextHandler={handleNext} /> : null}
            
            {/* Displays pop up screen */}
            {showGameOver? <PopUpScreen/> : null}


            {/* <button onClick={handleNext}>Next</button> */}
        </div>
    );
}

export default StoryPageTemplate;