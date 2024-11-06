import { Dispatch } from 'redux';
import { setGeoJSONData } from '../store/geoJsonSlice';
import { AppDispatch } from '../store/store';

export const fetchGeoJSONData = () => async (dispatch: Dispatch<AppDispatch>) => {
  try {
    const response = await fetch('/India-Interractive-Landing-Page/india.geojson');
    if (!response.ok) {
      throw new Error('Failed to fetch GeoJSON data');
    }
    const data = await response.json();
    dispatch(setGeoJSONData(data));
  } catch (error) {
    console.error('Error fetching GeoJSON:', error);
  }
};
