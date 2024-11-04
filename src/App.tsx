import './App.css'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { setMobileView } from './store/viewportSlice';
import { loadStatesFromFile } from './store/stateSlice';

import NavBar from './components/nav/nav';
import Hero from './Pages/Hero';

function App() {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector((state) => state.viewport.isMobile);

  console.log("Is Mobile View", isMobile);


  useEffect(() => {
    const updateMobileView = () => {
      dispatch(setMobileView(window.innerWidth <= 760));
    };

    // Run on initial load for mobile view check
    updateMobileView();

    // Add resize event listener
    window.addEventListener('resize', updateMobileView);


    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateMobileView);
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadStatesFromFile());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div>
        <Hero />
      </div>





    </>
  );
}

export default App;
