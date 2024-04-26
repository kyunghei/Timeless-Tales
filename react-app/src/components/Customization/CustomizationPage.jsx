import GenreStep from './GenreStep';
import React, { useState } from 'react';

/**
 * CustomizationPage component serves as the container for the multi-step customization form.
 */

function CustomizationPage() {

    // State to keep track of the current step within the form
    const [currentStep, setCurrentStep] = useState(1);

    // Total number of steps in the form
    const totalSteps = 3;

    /**
     * Advances the form to the next step if the current step is not the last step.
     * This function is triggered on completion of each form step.
     */
    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <>
            <h2>Customize Your Adventure</h2>
            {currentStep === 1 && <GenreStep onNextStep={handleNextStep} />}

        </>

    );
}

export default CustomizationPage;