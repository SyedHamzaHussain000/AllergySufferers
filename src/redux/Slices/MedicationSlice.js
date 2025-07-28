// MedicationSlice.js
import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

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
        med => !(med.id === newMed.id && med.date === newMed.date),
      );
    },
    addUnitToActiveMedicaton: (state, action) => {
      const newMed = action.payload;
      const index = state.ActiveMedications.findIndex(
        med => med.id === newMed.id && med.date === newMed.date,
      );
      if (index !== -1) {
        state.ActiveMedications[index].units += 1;
      }
    },
    removeUnitToActiveMedicaton: (state, action) => {
      const newMed = action.payload;
      const index = state.ActiveMedications.findIndex(
        med => med.id === newMed.id && med.date === newMed.date,
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
    UpdateMedicationListOnEveryDate: (state, action) => {
      const curretDate = moment(new Date()).format('YYYY-MM-DD');
      const allMedRecords = state.ActiveMedications;
      const newMed = action.payload;

      console.log("newMed",newMed)

      const existMed = allMedRecords.find(
        med => med.id == newMed.id && med.date == curretDate,
      );

      if (existMed) {
        console.log('this med is already exist');
      } else {
        console.log('We are adding the medication');
        state.ActiveMedications.push({
          ...newMed,
          date: curretDate,
          units: 0,
        });
      }
    },
    RemoveUpdateMedicationListOnEveryDate: (state, action) => {
      const curretDate = moment(new Date()).format('YYYY-MM-DD');
      const medToRemove = action.payload;

      // Find index of the matching medication
      const index = state.ActiveMedications.findIndex(
        med => med.id === medToRemove.id && med.date === curretDate,
      );

      if (index !== -1) {
        state.ActiveMedications.splice(index, 1); // remove 1 element at index
        console.log('medication removed successfully');
      } else {
        console.log('no matching medication found to remove');
      }
    },
    removeCurrentActiveMedication: (state, action) => {
      const newMed = action.payload;
      state.MyCurrentMeds = state.MyCurrentMeds.filter(
        med => med.id !== newMed.id,
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
  UpdateMedicationListOnEveryDate,
  RemoveUpdateMedicationListOnEveryDate,
} = MedicationSlice.actions;

export default MedicationSlice.reducer;
