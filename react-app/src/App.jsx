import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import HomeContent from './components/Home/HomeContent.jsx';
import CustomizePage from './components/Customization/CustomizationPage.jsx';
import './assets/styles.css';

// import StoryPageTemplate from './components/Story/StoryPageTemplate.jsx';
import StoryPage from './components/Story/StoryPage.jsx';
import { useState } from 'react';

// App component serves as the root. 
// Sets up routing and global states that will be passed to components.
function App() {
  // State to force StoryComponent to re-render when restarting
  const [key, setKey] = useState(0);

  // State to track the genre selected.
  const [selectedGenre, setSelectedGenre] = useState('');

  // State to track what avatar the user selected. Will pass index. 
  // Indices: 0 = Avatar1, 1 = Avatar2, 2 = Avatar3
  const [selectedAvatar, setSelectedAvatar] = useState(3);

  // State to track user's character name
  const [selectedName, setSelectedName] = useState('');

  // State to track the length selected.
  const [selectedLength, setSelectedLength] = useState(0);

  function handleRestart() {
    // Updates key number to force remount.
    setKey(key + 1);
  }

  return (
    <Router>
      <div>
        <Header />
        <Routes>

          <Route exact path="/" element={<HomeContent />} />

          <Route path='/customization' element={
            <CustomizePage
              selectedGenre={selectedGenre}
              selectedAvatar={selectedAvatar}
              selectedName={selectedName}
              selectedLength={selectedLength}
              setSelectedLength={setSelectedLength}
              setSelectedAvatar={setSelectedAvatar}
              setSelectedGenre={setSelectedGenre}
              setSelectedName={setSelectedName} />} />

          <Route path='/story' element={
            <StoryPage selectedGenre={selectedGenre}
              selectedAvatar={selectedAvatar}
              selectedName={selectedName}
              selectedLength={selectedLength} key={key} handleRestart={handleRestart} />} />
          {/* <Route path='/story1' element={<StoryPageTemplate />} /> */}

        </Routes>
      </div>
    </Router>

  );
}

export default App
