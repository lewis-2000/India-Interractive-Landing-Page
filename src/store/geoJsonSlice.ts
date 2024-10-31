/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeoJsonObject } from 'geojson'; // Import GeoJsonObject type

interface GeoJSONState {
  data: GeoJsonObject | null; // Change 'any' to 'GeoJsonObject'
}

const initialState: GeoJSONState = {
  data: null, // Start with no data
};

const geoJsonSlice = createSlice({
  name: 'geoJson',
  initialState,
  reducers: {
    setGeoJSONData(state, action: PayloadAction<GeoJsonObject>) { 
      state.data = action.payload;
    },
  },
});

export const { setGeoJSONData } = geoJsonSlice.actions;
export default geoJsonSlice.reducer;
