import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {signOut} from '../../screens/auth/SignInWithGoogle';

const initialState = {
  user: null,
  showError: '',
  loader: false,
  isExpired: true, 
  expireDate: "",
  SubscriptionType: "",
  currentLocation : {
    Lat: null,
    Lng: null
  }
}


export const CurrentLogin = createAsyncThunk(
  'user',
  async (config, {rejectWithValue}) => {
    try {
      const {data} = await axios.request(config);
      console.log('............', data);

      return data; // Return the login response data to the slice
    } catch (error) {
      // console.log('Error during login:', error);
      return rejectWithValue(error.response?.data || 'Login failed'); // Handle errors
    }
  },
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      state.user = action.payload;

    },
    setLogout: state => {
      
      state.user = null;
      state.expireDate = ""
      state.isExpired = true
      state.currentLocation.Lat = null
      state.currentLocation.Lng = null

    },
    setCurrentUserData: (state, action) => {
      state.user = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload
    },
    setSubscription: (state, action) => {


      state.isExpired = action.payload.isExpired
      state.expireDate = action.payload.expireDate
      state.SubscriptionType = action.payload.SubscriptionType
    },
    setCurrentLatLng: (state, action) => {
      console.log("act", action.payload)
      state.currentLocation.Lat = action.payload.Lat
      state.currentLocation.Lng = action.payload.Lng
    }
  },
  extraReducers: builder => {
    builder
      .addCase(CurrentLogin.fulfilled, (state, action) => {
        
        state.user = action.payload
        state.loader = false;
        
      })
      .addCase(CurrentLogin.pending, (state, action) => {
      })
      .addCase(CurrentLogin.rejected, (state, action) => {
        state.loader = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setData,
  setLogout,
  setLoader,
  setCurrentUserData,
  setSubscription,
  setCurrentLatLng
} = AuthSlice.actions;

export default AuthSlice.reducer;
