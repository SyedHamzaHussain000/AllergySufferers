import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {signOut} from '../../screens/auth/SignInWithGoogle';

const initialState = {
  user: null,
  showError: '',
  loader: false
};

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
    },
    setCurrentUserData: (state, action) => {
      state.user = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload
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
  setCurrentUserData
} = AuthSlice.actions;

export default AuthSlice.reducer;
