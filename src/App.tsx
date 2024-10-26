import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import State from './components/States/State';
import Hero from './Pages/Hero';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/state/:stateName" element={<State />} />
      </Routes>
    </Router>
  );
}

export default App;
