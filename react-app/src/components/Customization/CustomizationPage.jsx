import React, { useState } from 'react';
import GenreStep from './GenreStep';
import LengthStep from './LengthStep';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import CharacterStep from './CharacterStep';

/**
 * CustomizationPage component serves as the container for the multi-step customization form.
 */

function CustomizationPage() {

    const [currentStep, setCurrentStep] = useState(1); // State to keep track of the current step within the form.
    const [isStepValid, setIsStepValid] = useState({ 1: false, 2: false, 3: false, 4: false }); // Validity of each step to check if user selection was made.
    const [selectedGenre, setSelectedGenre] = useState(''); // State to track the genre selected.
    const [selectedLength, setSelectedLength] = useState(5); // State to track the length selected.
    const [selectedAvatar, setSelectedAvatar] = useState(''); // State to track what avatar the user selected. 1 = Avatar1, 2 = Avatar2, 3 = Avatar3
    const [selectedName, setSelectedName] = useState(''); // State to track user's character name

    // Total number of steps in the form
    const totalSteps = 3;

    //Advances the form to the next step if current step is valid and not the last step.
    const handleNextStep = () => {
        if (currentStep < totalSteps && isStepValid[currentStep]) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Takes user to the previous step of the form, if not on the first step.
    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    // Handler that updates the genre selected
    const handleGenreSelection = (genre) => {
        setSelectedGenre(genre);
        setIsStepValid({ ...isStepValid, 1: true });
    }

    // Handler that updates the story length selected.
    const handleLengthSelection = (length) => {
        setSelectedLength(length);
        setIsStepValid({ ...isStepValid, 2: true });
    }

    // Handler that updates the avater selected.
    const handleAvatarSelection = (avatar) => {
        setSelectedAvatar(avatar);
        setIsStepValid({ ...isStepValid, 3: true });
    }

    // Handler that updates the character name.
    const handleNameSelection = (e) => {
        setSelectedName(e.target.value);
        setIsStepValid({ ...isStepValid, 4: true });
    }

    return (
        <>
            <h1>Customize Your Adventure</h1>
            {currentStep === 1 && <GenreStep selectedGenre={selectedGenre} onGenreSelect={handleGenreSelection} />}
            {currentStep === 2 && <LengthStep selectedLength={selectedLength} onLengthSelect={handleLengthSelection} />}
            {currentStep === 3 && <CharacterStep selectedAvatar={selectedAvatar} onAvatarSelect={handleAvatarSelection} selectedName={selectedName} onNameSelect={handleNameSelection} />}
            <div style={{ textAlign: 'center', padding: '20px' }}>
                {/* Previous button displayed except on the first step */}
                {currentStep > 1 && <PreviousButton onClick={handlePreviousStep} disabled={currentStep === 1} />}

                {/* Next button displayed except on the last step */}
                {currentStep < 3 && <NextButton onClick={handleNextStep} disabled={!isStepValid[currentStep]} />}

                {/* Start button only on the last step */}
                {currentStep === 3 && <button>Start</button>}
            </div>
        </>

    );
}

export default CustomizationPage;