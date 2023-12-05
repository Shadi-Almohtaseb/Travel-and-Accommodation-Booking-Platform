import { createSlice } from '@reduxjs/toolkit';
import { featuredHotels } from '../thunks/homeThunk';

const initialState = {
  hotels: null,
  isError: false,
  loading: false,
} as any;

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    // Reducers for featuredHotels action
    builder.addCase(featuredHotels.fulfilled, (state, action) => {
      state.hotels = action.payload
      state.loading = false;
      state.isError = false
    });
    builder.addCase(featuredHotels.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(featuredHotels.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });
  }
});

export const { reset } = homeSlice.actions;
export default homeSlice.reducer;