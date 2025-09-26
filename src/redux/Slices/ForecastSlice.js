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

    clearForaCastSlive: state => {
      state.AllForcast = [];
    },

    //Set active 
    setAndUpdateActivePollen: (state, action) => {
        
    }
  },
});

export const {setForeCastSlice, removeForeCastSlice, clearForaCastSlive} =
  ForecastSlice.actions;

export default ForecastSlice.reducer;
