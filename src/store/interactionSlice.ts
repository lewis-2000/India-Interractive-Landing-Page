import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InteractionState {
  stateHover: string | null;
  zoneHover: number | null;
  stateClick: string | null;
  zoneClick: string | null;
}

const initialState: InteractionState = {
  stateHover: null,
  zoneHover: null,
  stateClick: null,
  zoneClick: null,
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setStateHover(state, action: PayloadAction<string | null>) {
      state.stateHover = action.payload;
    },
    setZoneHover(state, action: PayloadAction<number | null>) {
      state.zoneHover = action.payload;
    },
    setStateClick(state, action: PayloadAction<string | null>) {
      state.stateClick = action.payload;
    },
    setZoneClick(state, action: PayloadAction<string | null>) {
      state.zoneClick = action.payload;
    },
  },
});

export const {
  setStateHover,
  setZoneHover,
  setStateClick,
  setZoneClick,
} = interactionSlice.actions;
export default interactionSlice.reducer;
