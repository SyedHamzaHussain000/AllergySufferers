// MedicationSlice.js
import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {Alert} from 'react-native';

const initialState = {
  AllForcast: [],
};

const ForecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setForeCastSlice: (state, action) => {
      const cityPayload = action.payload.city;
      const forcastPayload = action.payload.data;

      const alreadyExists = state?.AllForcast?.some(
        f => f?.user?.locations?.closest?.name === cityPayload,
      );

      if (!alreadyExists) {
        // Deep clone for safety
        const clonedPayload = JSON.parse(JSON.stringify(forcastPayload));
        state.AllForcast = [...state.AllForcast, clonedPayload];
      } else {
        console.log(`⚠️ Forecast for ${cityPayload} already exists, skipping`);
      }
    },
    removeForeCastSlice: (state, action) => {
      const cityPayload = action.payload;

      state.AllForcast = state.AllForcast.filter(
        f => f?.user?.locations?.closest?.name !== cityPayload,
      );

      console.log(`🗑️ Removed forecast for ${cityPayload}`);
    },
    updateYesterdaySavedForcast: (state, action) => {
  const cityToUpdate = action.payload.city;
  const newForecastData = action.payload.data;

  const index = state.AllForcast.findIndex(
    f => f?.user?.locations?.closest?.name === cityToUpdate
  );

  if (index !== -1) {
    // Replace the existing forecast at this index
    state.AllForcast[index] = JSON.parse(JSON.stringify(newForecastData));
    console.log(`🔄 Updated forecast for ${cityToUpdate}`);
  } else {
    console.log(`⚠️ No forecast found for ${cityToUpdate} to update`);
  }
},
    clearForaCastSlive: state => {
      state.AllForcast = [];
    },
    //Set active 
    setAndUpdateActivePollen: (state, action) => {
        
    }
  },
});

export const {setForeCastSlice, removeForeCastSlice, clearForaCastSlive, updateYesterdaySavedForcast} = ForecastSlice.actions;

export default ForecastSlice.reducer;
