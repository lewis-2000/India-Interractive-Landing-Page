import './App.css'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { setMobileView } from './store/viewportSlice';
import { fetchGeoJSONData } from './utils/geoData';

import NavBar from './components/nav/nav';
import Hero from './Pages/Hero';

function App() {
  const dispatch = useAppDispatch();
  const geoData = useAppSelector((state) => state.geoJson.data);
  // const isMobile = useAppSelector(state => state.viewport.isMobile);



  useEffect(() => {
    const updateMobileView = () => {
      dispatch(setMobileView(window.innerWidth <= 760));
    };

    // Run on initial load for mobile view check
    updateMobileView();

    // Fetch GeoJSON data on initial load
    if (geoData === null) {
      dispatch(fetchGeoJSONData());

    }

    // Add resize event listener
    window.addEventListener('resize', updateMobileView);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateMobileView);
  }, [dispatch, geoData]);

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
