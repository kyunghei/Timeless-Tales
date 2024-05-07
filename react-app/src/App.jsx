import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import HomeContent from './components/Home/HomeContent.jsx';
import CustomizePage from './components/Customization/CustomizationPage.jsx';
import StoryPageTemplate from './components/Story/StoryPageTemplate.jsx';
// import StoryPage from './components/Story/StoryPage.jsx';

// App component serves as the root. 
// We will add other components to our app component, which will tie it all together.
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeContent />} />
          <Route path='/customization' element={<CustomizePage />} />
          {/* <Route path='/story' element={<StoryPage />} /> */}
          <Route path='/story1' element={<StoryPageTemplate />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App
