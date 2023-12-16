import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, fetchUser } from '../thunks/userThunk';

type UserType = {
  userType: string,
  given_name: string,
  family_name: string,
}

interface UserState {
  User: UserType | null,
  isError: boolean,
  loading: boolean,

}

let User: UserType = localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User") as string) : null;

const initialState = {
  User: User ? User : null,
  isError: false,
  loading: false,
} as UserState;

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
    // Reducers for fetchUser action
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.User = action.payload
      state.loading = false;
      state.isError = false
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });

    // Reducers for loginUser action
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.User = action.payload
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
      state.User = null
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