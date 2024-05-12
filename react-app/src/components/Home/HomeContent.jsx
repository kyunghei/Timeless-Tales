import React from 'react';
import Accordion from './Accordion.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp';

// Bulk of the home page, where we introduce Timeless Tales
function HomeContent() {
    let navigate = useNavigate(); // Hook for navigation

    function goToCustomization() {
        navigate('/customization');
    }

    return (
        <main>
            <div className='home-div'>
                <div className='text-div'>
                    <h1 className='choose'>Choose Your Adventure,</h1>
                    <h1 className='craft'>Craft Your Destiny</h1>
                    <p>Welcome to Timeless Tales, your gateway to an infinite array of choose-your-own adventures stories
                        where every choice shapes your unique narrative journey. Unlike traditional story games with fixed outcomes,
                        Timeless Tales leverages the latest AI technology to generate endless storylines and dynamic images,
                        making each playthough distinct and captivating.</p>
                    <p className='underline'>How It Works:</p>
                    <Accordion />
                    <div className='button-div'>
                        <h2>What Will Your Story Be?</h2>
                        <button className='get-started' onClick={goToCustomization}>Get Started</button>                        
                    </div>
                </div>
                <div className='logo-div'>
                    <img src={logo} alt="Home Page Image"/>
                </div>
            </div>


        </main>
    );
}

export default HomeContent