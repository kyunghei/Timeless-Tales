import { useState } from 'react';
import GenreStep from './GenreStep';
import LengthStep from './LengthStep';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import CharacterStep from './CharacterStep';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from './ProgressIndicator';
import PropTypes from 'prop-types';
import axios from 'axios';


/**
 * CustomizationPage component serves as the container for the multi-step customization form.
 */
function CustomizationPage({ selectedGenre, selectedAvatar, selectedName, selectedLength, setSelectedLength, setSelectedGenre, setSelectedAvatar, setSelectedName }) {

    const [currentStep, setCurrentStep] = useState(1); // State to keep track of the current step within the form.
    const [isStepValid, setIsStepValid] = useState({ 1: false, 2: false, 3: false, 4: false }); // Validity of each selection to check if user selection was made.

    const navigate = useNavigate(); // Hook for navigation

    // Access backend URL from env
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    console.log(BACKEND_URL);

    // Asynchronously submits all customization data to the backend. On success, navigates user to the story page. 
    async function handleStart() {
        const formData = {
            genre: selectedGenre,
            storyLength: selectedLength,
            name: selectedName
        }

        console.log(formData);
        try {
            const res = await axios.post(`${BACKEND_URL}/customization`, formData);

            if (res.status === 200) {
                console.log("form submission successful");
                navigate('/story');
            } else {
                console.error("Couldn't post form data:", res.status);
            }
        } catch (error) {
            console.error("Error submitting the form data");
        }
    }

    // Total number of steps in the form
    const totalSteps = 3;

    //Advances the form to the next step if current step is valid and not the last step.
    function handleNextStep() {
        if (currentStep < totalSteps && isStepValid[currentStep]) {
            setCurrentStep(currentStep + 1);
        }
    }

    // Takes user to the previous step of the form, if not on the first step.
    function handlePreviousStep() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    // Handler that updates the genre selected
    function handleGenreSelection(genre) {
        setSelectedGenre(genre);
        setIsStepValid({ ...isStepValid, 1: true });
    }

    // Handler that updates the story length selected.
    function handleLengthSelection(length) {
        setSelectedLength(length);
        setIsStepValid({ ...isStepValid, 2: true });
    }

    // Handler that updates the avater selected.
    function handleAvatarSelection(avatar) {
        setSelectedAvatar(avatar);
        setIsStepValid({ ...isStepValid, 3: true });
    }

    // Handler that updates the character name.
    function handleNameSelection(e) {
        setSelectedName(e.target.value);
        setIsStepValid({ ...isStepValid, 4: true });
    }

    return (
        <div className='customization'>
            <h1>Customize Your Adventure</h1>
            <ProgressIndicator currentStep={currentStep} />
            {currentStep === 1 && <GenreStep selectedGenre={selectedGenre} onGenreSelect={handleGenreSelection} />}
            {currentStep === 2 && <LengthStep selectedLength={selectedLength} onLengthSelect={handleLengthSelection} />}
            {currentStep === 3 && <CharacterStep selectedGenre={selectedGenre} selectedAvatar={selectedAvatar} onAvatarSelect={handleAvatarSelection} selectedName={selectedName} onNameSelect={handleNameSelection} />}
            <div className='button-container'>
                {/* Previous button displayed except on the first step */}
                {currentStep > 1 && <PreviousButton onClick={handlePreviousStep} disabled={currentStep === 1} />}

                {/* Next button displayed except on the last step */}
                {currentStep < 3 && <NextButton className='right-align' onClick={handleNextStep} disabled={!isStepValid[currentStep]} />}

                {/* Start button only on the last step */}
                {currentStep === 3 && <StartButton onClick={handleStart} disabled={!(isStepValid[currentStep] && isStepValid[currentStep + 1])} />}
            </div>
        </div>
    );
}

/**
 * @param {function} onClick Submits the form to the bacnkend and navigates to story page.
 * @param {boolean} disabled Indicates if button should be disabled or not.
 */
function StartButton({ onClick, disabled }) {
    return (
        <button className='start-button right-align' onClick={onClick} disabled={disabled}>Start</button>
    );
}

export default CustomizationPage;

CustomizationPage.propTypes = {
    selectedGenre: PropTypes.string.isRequired,
    selectedAvatar: PropTypes.number.isRequired,
    selectedName: PropTypes.string.isRequired,
    selectedLength: PropTypes.number.isRequired,
    setSelectedLength: PropTypes.func.isRequired,
    setSelectedAvatar: PropTypes.func.isRequired,
    setSelectedGenre: PropTypes.func.isRequired,
    setSelectedName: PropTypes.func.isRequired
}

StartButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}