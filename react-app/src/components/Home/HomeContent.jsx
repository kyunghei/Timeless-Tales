import Accordion from './Accordion.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp';

// Bulk of the home page, where we introduce Timeless Tales
function HomeContent() {
    let navigate = useNavigate(); // Hook for navigation

    const goToCustomization = () => {
        navigate('/customization');
    };

    return (
        <main>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', maxWidth: '1200px', margin: '0 auto', padding: '0 50px' }}>
                <div style={{ flex: 3, padding: '20px' }}>
                    <h1>Choose Your Adventure,</h1>
                    <h1>Craft Your Destiny</h1>
                    <p>Welcome to Timeless Tales, your gateway to an infinite a rray of choose-your-own adventures stories
                        where every choice shapes your unique narrative journey. Unlike traditional story games with fixed outcomes,
                        Timeless Tales leverages the latest AI technology to generate endless storylines and dynami images,
                        making each playthough distinct and captivating.</p>
                    <Accordion />
                    <h2>What Will Your Story Be?</h2>
                    <button onClick={goToCustomization}>Get Started</button>
                </div>
                <div style={{ flex: 1 }}>
                    <img src={logo} alt="Home Page Image" style={{ width: '100%', maxWidth: '100%' }} />
                </div>
            </div>


        </main>
    );
}

export default HomeContent