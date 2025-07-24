// MedicationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ActiveMedications: [],
  MyCurrentMeds: [],
};

const MedicationSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    setActiveMedication: (state, action) => {
      state.ActiveMedications = action.payload;
    },
    deleteActiveMedication: (state, action) => {
      const newMed = action.payload;
      state.ActiveMedications = state.ActiveMedications.filter(
        med => !(med.id === newMed.id && med.date === newMed.date)
      );
    },
    addUnitToActiveMedicaton: (state, action) => {
      const newMed = action.payload;
      const index = state.ActiveMedications.findIndex(
        med => med.id === newMed.id && med.date === newMed.date
      );
      if (index !== -1) {
        state.ActiveMedications[index].units += 1;
      }
    },
    removeUnitToActiveMedicaton: (state, action) => {
      const newMed = action.payload;
      const index = state.ActiveMedications.findIndex(
        med => med.id === newMed.id && med.date === newMed.date
      );
      if (index !== -1 && state.ActiveMedications[index].units > 0) {
        state.ActiveMedications[index].units -= 1;
      }
    },
    setCurrentActiveMedication: (state, action) => {
      const newMed = action.payload;
      const exists = state.MyCurrentMeds.some(med => med.id === newMed.id);
      if (!exists) {
        state.MyCurrentMeds.push(newMed);
      }
    },
    removeCurrentActiveMedication: (state, action) => {
      const newMed = action.payload;
      state.MyCurrentMeds = state.MyCurrentMeds.filter(
        med => med.id !== newMed.id
      );
    },
    deleteAllData: state => {
      state.ActiveMedications = [];
      state.MyCurrentMeds = [];
    },
  },
});

export const {
  setActiveMedication,
  deleteActiveMedication,
  addUnitToActiveMedicaton,
  removeUnitToActiveMedicaton,
  setCurrentActiveMedication,
  removeCurrentActiveMedication,
  deleteAllData,
} = MedicationSlice.actions;

export default MedicationSlice.reducer;
