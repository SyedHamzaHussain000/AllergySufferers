// MedicationSlice.js
import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {Alert} from 'react-native';

const initialState = {
  index: 0,
};

const BlackListSlice = createSlice({
  name: 'blacklist',
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const {
  setIndex,
 

} = BlackListSlice.actions;

export default BlackListSlice.reducer;
