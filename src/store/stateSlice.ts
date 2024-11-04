/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the state
interface Capital {
    name: string;
    coordinates: [number, number]; 
}

interface State {
    name: string;
    color: string;
    url: string;
    capital: Capital;
}

// Define the initial state
const initialState: State[] = [];

//State slice
const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        setStates: (state, action: PayloadAction<State[]>) => {
            return action.payload;
        },
        updateState: (
            state, 
            action: PayloadAction<{ name: string; color?: string; url?: string; capital?: Capital }>
        ) => {
            const { name, color, url, capital } = action.payload;
            const existingState = state.find(s => s.name === name);
            if (existingState) {
                if (color) existingState.color = color;
                if (url) existingState.url = url;
                if (capital) existingState.capital = capital;
            }
        },
    },
});

export const { setStates, updateState } = statesSlice.actions;
export default statesSlice.reducer;

// Load states from JSON file
export const loadStatesFromFile = () => async (dispatch:any) => {
    try {
        const response = await axios.get('/India-Interractive-Landing-Page/statesData.json');
        dispatch(setStates(response.data));
    } catch (error) {
        console.error('Error loading states data:', error);
    }
};
