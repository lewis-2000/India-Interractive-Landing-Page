import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Change here
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
