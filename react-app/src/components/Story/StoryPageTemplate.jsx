// import StoryBeat from './StoryBeat';
import StoryBeatText from './StoryBeatText';
import StoryBeatImage from './StoryBeatImage';
import StoryButton from './StoryButton';
import StoryBackgroundImage from './StoryBackgroundImage';
import AvatarDisplay from './AvatarDisplay';
import AvatarLife from './AvatarLife';
import ProgressBar from './ProgressBar';
import { useState } from 'react';
// import axios from 'axios';

function StoryPageTemplate() {

    // // State to save the current story beat data (text, possible choices, images) sent from backend
    const [currentBeatData, setCurrentBeatData] = useState({
        avatar: 1,
        genre: "Western",
        name: "Doobs",
        lives: 0,
        gpt_text: 
        "velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus",
        max_beat: 12,
        current_beat: 2,
        gpt_img: "https://drlauravarnam.files.wordpress.com/2018/06/you-got-this-meme.jpg"
    });

    console.log(setCurrentBeatData);

    // // Bool state that controls whether to show story text or story choices
    // const [showChoices, setShowChoices] = useState(false);

    // // Fetch first story beat data from backend when component mounts.
    // useEffect(() => {
    //     async function fetchFirstBeat() {
    //         try {
    //             const res = await axios.get('url');
    //             setCurrentBeatData(res.data);
    //         } catch (error) {
    //             console.error('Error fetching first story beat:', error);
    //         }
    //     }
    //     fetchFirstBeat();
    // }, []);

    // // TODO: Add some conditional rendering for loading state here

    // function handleNext() {
    //     setShowChoices(!showChoices);
    // }


    return (
        <div>
            {/* <StoryBeat text={currentBeatData.text} /> */}
            
            <StoryBackgroundImage genre={currentBeatData.genre} />
            <AvatarDisplay name ={currentBeatData.name} avatar={currentBeatData.avatar} genre={currentBeatData.genre}/>
            <AvatarLife genre={currentBeatData.genre} lives={currentBeatData.lives}/>
            <StoryButton genre={currentBeatData.genre} lives={currentBeatData.lives}/>
            <StoryBeatImage imageUrl={currentBeatData.gpt_img}/>
            <StoryBeatText story={currentBeatData.gpt_text}/>
            <ProgressBar currentBeat={currentBeatData.current_beat} maxBeat={currentBeatData.max_beat}/>

            {/* <button onClick={handleNext}>Next</button> */}
        </div>
    );
}

export default StoryPageTemplate;