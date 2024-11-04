/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Zone {
  zone: number;
  url: string;
  highlightColor: string;
}

// Define the initial state
const initialState: Zone[] = [];

// Create the slice
const zonesSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {
    setZones: (state, action: PayloadAction<Zone[]>) => {
      return action.payload;
    },
    updateZone: (
      state, 
      action: PayloadAction<{ zone: number; url?: string; highlightColor?: string }>
    ) => {
      const { zone, url, highlightColor } = action.payload;
      const existingZone = state.find(z => z.zone === zone);
      if (existingZone) {
        if (url) existingZone.url = url;
        if (highlightColor) existingZone.highlightColor = highlightColor;
      }
    },
  },
});

export const { setZones, updateZone } = zonesSlice.actions;
export default zonesSlice.reducer;

// Thunk to load zones from JSON file
export const loadZonesFromFile = () => async (dispatch: any) => {
  try {
    const response = await axios.get('/India-Interractive-Landing-Page/zonesData.json');
    dispatch(setZones(response.data));
  } catch (error) {
    console.error('Error loading zones data:', error);
  }
};
