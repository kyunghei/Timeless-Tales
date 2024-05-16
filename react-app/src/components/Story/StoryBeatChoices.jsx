import PropTypes from 'prop-types';
//import { useState } from 'react';

/**
 * Displays the story beat choices
 * @param {array} choices 
 * @param {func} userChoiceHandler
 */

// receive choices
//send user choice

function StoryBeatChoices({choices, userChoiceHandler}) {

    // const [userChoice, setUserChoice] = useState();

    function handleUserChoice(e){
        const userChoice = e.target.value;
        userChoiceHandler(userChoice)
    }

    return (
        <>
            <div>
                <input type="radio" name="choices" id="choice_1" value="choice_1" onClick={handleUserChoice}/> 
                <label htmlFor="choice_1">{choices[0]}</label>
            </div>
            <div>
                <input type="radio" name="choices" id="choice_2" value="choice_2" onClick={handleUserChoice}/> 
                <label htmlFor="choice_2">{choices[1]}</label>
            </div>
            <div>
                <input type="radio" name="choices" id="choice_3" value="choice_3" onClick={handleUserChoice}/> 
                <label htmlFor="choice_3">{choices[2]}</label>
            </div>
        </>
    );
}

export default StoryBeatChoices;

StoryBeatChoices.propTypes = {
    choices: PropTypes.array.isRequired,
    userChoiceHandler: PropTypes.func.isRequired
}