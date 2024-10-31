// src/store/statisticsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface StatisticsState {
  pageViews: number;
  interactions: number;
}

const initialState: StatisticsState = {
  pageViews: 0,
  interactions: 0,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    incrementPageViews(state) {
      state.pageViews += 1;
    },
    incrementInteractions(state) {
      state.interactions += 1;
    },
  },
});

export const { incrementPageViews, incrementInteractions } = statisticsSlice.actions;
export default statisticsSlice.reducer;
