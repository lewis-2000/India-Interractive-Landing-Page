// src/store/viewportSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewportState {
  isMobile: boolean;
}

const initialState: ViewportState = {
  isMobile: false,
};

const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    setMobileView(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },
  },
});

export const { setMobileView } = viewportSlice.actions;
export default viewportSlice.reducer;
