import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, signupUser } from '../thunks/userThunk';

let User = JSON.parse(localStorage.getItem("User") || "{}");
let storedToken = localStorage.getItem("token");
let token = storedToken ? JSON.parse(storedToken) : null;

const initialState = {
  User: User ? User : {},
  token: token ? token : null,
  isError: false,
  loading: false,
} as any;

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    // Reducers for signupUser action
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.User = action.payload.User
      state.token = action.payload.token;
      state.loading = false;
      state.isError = false
    });
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });

    // Reducers for loginUser action
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.User = action.payload.User
      state.token = action.payload.token;
      state.loading = false;
      state.isError = false
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });

    // Reducers for logoutUser action
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.User = {};
      state.token = null;
      state.loading = false;
      state.isError = false
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });
  }
});

export const { reset } = authUserSlice.actions;
export default authUserSlice.reducer;