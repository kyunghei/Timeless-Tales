// import StoryBeat from './StoryBeat';
import StoryBeatText from './StoryBeatText';
import StoryBeatImage from './StoryBeatImage';
import StoryButton from './StoryButton';
import StoryBackgroundImage from './StoryBackgroundImage';
import AvatarDisplay from './AvatarDisplay';
import AvatarLife from './AvatarLife';
import ProgressBar from './ProgressBar';
import PopUpScreen from './PopUpScreen';
import SelectChoiceBtn from './SelectChoiceBtn';
import PlayAgainBtn from './PlayAgainBtn';
import StoryBeatChoices from './StoryBeatChoices';
import { useState } from 'react';
// import axios from 'axios';

function StoryPageTemplate() {

    // // State to save the current story beat data (text, possible choices, images) sent from backend
    const [currentBeatData, setCurrentBeatData] = useState({
        avatar: 1,
        genre: "Western",
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

    // boolean to display story text or choices
    //const [isStory, setIsStory] = useState(true);

    // Bool state that controls whether to show story text or story choices
    const [showChoices, setShowChoices] = useState(false);

    const [userChoice, setUserChoice] = useState("");

    // linting errors
    console.log(setCurrentBeatData);
    console.log(setIsStory);
    console.log(userChoice);


    function handlePopUp(){
        setShowGameOver(!showGameOver);
    }

    function handleNext() {
        setShowChoices(!showChoices);
    }

    function handleUserChoice(user_choice){
        setUserChoice(user_choice);
    }

    return (
        <div>
            {/* <StoryBeat text={currentBeatData.text} /> */}
            
            <StoryBackgroundImage genre={currentBeatData.genre} />
            <AvatarDisplay name ={currentBeatData.name} avatar={currentBeatData.avatar} genre={currentBeatData.genre}/>
            <AvatarLife genre={currentBeatData.genre} lives={currentBeatData.current_lives}/>

            <StoryBeatImage imageUrl={currentBeatData.story_image}/>
            
            {showChoices? <StoryBeatChoices choices={[currentBeatData.choice_1, currentBeatData.choice_2, currentBeatData.choice_3]} userChoiceHandler={handleUserChoice}/> : <StoryBeatText story={currentBeatData.story_text}/>}
            <ProgressBar currentBeat={currentBeatData.current_beat} maxBeat={currentBeatData.max_beat}/>

            {currentBeatData.current_lives == 0 ? <PlayAgainBtn genre={currentBeatData.genre} popUpHandler={handlePopUp}/> : null}
            {showChoices? <SelectChoiceBtn genre={currentBeatData.genre}/> : <StoryButton genre={currentBeatData.genre} nextHandler={handleNext} />}
            

            {showGameOver? <PopUpScreen/> : null}


            {/* <button onClick={handleNext}>Next</button> */}
        </div>
    );
}

export default StoryPageTemplate;