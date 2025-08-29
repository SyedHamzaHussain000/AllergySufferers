// // store.js

// import {combineReducers, configureStore} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistReducer, persistStore} from 'redux-persist';
// import  AuthSlice from './Slices/AuthSlice';


// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const rootReducer = combineReducers({
//     auth: AuthSlice,
//   });
  
// const persistedReducer = persistReducer(persistConfig, rootReducer);




// export const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production',
  
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });


// export const persistor = persistStore(store);


// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistReducer, persistStore } from 'redux-persist';

// import AuthReducer from './Slices/AuthSlice';
// import MedicationReducer from './Slices/MedicationSlice';

// const authPersistConfig = {
//   key: 'auth',
//   storage: AsyncStorage,
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, AuthReducer), // only this is persisted
//   medications: MedicationReducer, // not persisted
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export const persistor = persistStore(store);



import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';


import AuthReducer from './Slices/AuthSlice';
import MedicationReducer from './Slices/MedicationSlice';
import BlackListSlice from './Slices/BlackListSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'medications'], // ✅ Persist both slices
  blacklist: ['blacklist'], // ✅ exclude medications from persistence
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  medications: MedicationReducer,
  blacklist: BlackListSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
