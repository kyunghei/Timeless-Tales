import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx'
import HomeContent from './HomeContent.jsx'

// App component serves as the root. 
// We will add other components to our app component, which will tie it all together.
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeContent />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App
