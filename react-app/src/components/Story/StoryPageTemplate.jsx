// import StoryBeat from './StoryBeat';
import StoryBackgroundImage from './StoryBackgroundImage';
import AvatarDisplay from './AvatarDisplay';
import AvatarHealth from './AvatarHealth';
import { useState, useEffect } from 'react';
// import axios from 'axios';

const avatars = {
    Western: ['/avatars/western1.webp', '/avatars/western2.webp', '/avatars/western3.webp'],
    SciFi: ['/avatars/scifi1.webp', '/avatars/scifi2.webp', '/avatars/scifi3.webp'],
    Fantasy: ['/avatars/fantasy1.webp', '/avatars/fantasy2.webp', '/avatars/fantasy3.webp']
}



function StoryPageTemplate() {

    // // State to save the current story beat data (text, possible choices, images) sent from backend
    const [currentBeatData, setCurrentBeatData] = useState({
        avatar: 1,
        genre: "Western",
        name: "Toast",
        lives: 3,
        gpt_text: "hello hi bye yay wooooooo"
        //genre
        //story_length
        //gpt_img:
        //bg_img
    });

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
            <AvatarDisplay/>
            <AvatarHealth/>
            {/* <button onClick={handleNext}>Next</button> */}
        </div>
    );
}

export default StoryPageTemplate;