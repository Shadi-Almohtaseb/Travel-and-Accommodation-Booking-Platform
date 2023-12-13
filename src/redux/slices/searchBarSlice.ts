import { createSlice } from '@reduxjs/toolkit';
import { searchForHotels } from '../thunks/homeThunk';

const initialState = {
  searchHotels: null,
  isError: false,
  loading: false,
} as any;

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    // Reducers for search for hotels action
    builder.addCase(searchForHotels.fulfilled, (state, action) => {
      state.searchHotels = action.payload
      state.loading = false;
      state.isError = false
    });
    builder.addCase(searchForHotels.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(searchForHotels.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });
  }
});

export const { reset } = searchBarSlice.actions;
export default searchBarSlice.reducer;