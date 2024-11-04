import { configureStore } from '@reduxjs/toolkit';
// import geoJsonReducer from './geoJsonSlice';
import interactionReducer from './interactionSlice';
import statisticsReducer from './statisticsSlice';
import viewportReducer from './viewportSlice';
import stateSlice from './stateSlice';
import zonesSlice from './zonesSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
  reducer: {
    // geoJson: geoJsonReducer,
    interaction: interactionReducer,
    statistics: statisticsReducer,
    viewport: viewportReducer,
    stateSlice: stateSlice,
    zonesSlice: zonesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for large data to improve performance in development
      serializableCheck: {
        ignoredActions: ['geoJson/setGeoJSONData'], // Skip actions related to geoJson data
        ignoredPaths: ['geoJson.data'], // Skip checking the path where the large data is stored
      },
    }),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
