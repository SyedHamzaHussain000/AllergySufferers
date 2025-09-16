// MedicationSlice.js
import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';


const initialState = {
  index: 0,
  isInternetConnected: true
};

const BlackListSlice = createSlice({
  name: 'blacklist',
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setInternet:(state,action) => {
      state.isInternetConnected = action.payload
    }
  },
});

export const {
  setIndex,
 setInternet

} = BlackListSlice.actions;

export default BlackListSlice.reducer;
