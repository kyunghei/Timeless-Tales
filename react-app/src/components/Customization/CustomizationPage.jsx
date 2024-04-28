import GenreStep from './GenreStep';
import LengthStep from './LengthStep';
import React, { useState } from 'react';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';

/**
 * CustomizationPage component serves as the container for the multi-step customization form.
 */

function CustomizationPage() {

    // State to keep track of the current step within the form.
    const [currentStep, setCurrentStep] = useState(1);

    // Total number of steps in the form
    const totalSteps = 3;

    //Advances the form to the next step if current step is valid and not the last step.
    const handleNextStep = () => {
        if (currentStep < totalSteps && selectedGenre) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Takes user to the previous step of the form, if not on the first step.
    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    // State to track what Genre the user selected.
    const [selectedGenre, setSelectedGenre] = useState('');

    // Updates the genre selected
    const handleGenreSelection = (genre) => {
        setSelectedGenre(genre);
    }

    // State to track the story length user selected.
    const [selectedLength, setSelectedLength] = useState(0);

    // Updates the story length selected.
    const handleLengthSelection = (length) => {
        setSelectedLength(length);
    }


    return (
        <>
            <h2>Customize Your Adventure</h2>
            {currentStep === 1 && <GenreStep selectedGenre={selectedGenre} onGenreSelect={handleGenreSelection} />}
            {currentStep === 2 && <LengthStep selectedLength={selectedLength} onLengthSelect={handleLengthSelection} />}
            <PreviousButton onClick={handlePreviousStep} disabled={currentStep === 1} />
            <NextButton onClick={handleNextStep} disabled={!selectedGenre} />

        </>

    );
}

export default CustomizationPage;