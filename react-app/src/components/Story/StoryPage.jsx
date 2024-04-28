import StoryBeat from './StoryBeat';
import StoryImage from './StoryImage';
import { useState, useEffect } from 'react';
import axios from 'axios';

function StoryPage() {

    // State to save the current story beat data (text, possible choices, images) sent from backend
    const [currentBeatData, setCurrentBeatData] = useState(null);

    // Bool state that controls whether to show story text or story choices
    const [showChoices, setShowChoices] = useState(false);

    // Fetch first story beat data from backend when component mounts.
    useEffect(() => {
        async function fetchFirstBeat() {
            try {
                const res = await axios.get('url');
                setCurrentBeatData(res.data);
            } catch (error) {
                console.error('Error fetching first story beat:', error);
            }
        }
        fetchFirstBeat();
    }, []);

    // TODO: Add some conditional rendering for loading state here

    function handleNext() {
        setShowChoices(!showChoices);
    }


    return (
        <div>
            <StoryBeat text={currentBeatData.text} />
            <StoryImage imageUrl={currentBeatData.image} />
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default StoryPage;