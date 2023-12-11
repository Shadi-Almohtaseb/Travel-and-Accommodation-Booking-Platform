import { createSlice } from '@reduxjs/toolkit';
import { searchResults as searchResultsFun } from '../thunks/searchResultsThunk';

const initialState = {
  searchResults: null,
  isError: false,
  loading: false,
} as any;

const searchResults = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    // Reducers for searchResultsFun action
    builder.addCase(searchResultsFun.fulfilled, (state, action) => {
      state.searchResults = action.payload
      state.loading = false;
      state.isError = false
    });
    builder.addCase(searchResultsFun.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(searchResultsFun.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });
  }
});

export const { reset } = searchResults.actions;
export default searchResults.reducer;