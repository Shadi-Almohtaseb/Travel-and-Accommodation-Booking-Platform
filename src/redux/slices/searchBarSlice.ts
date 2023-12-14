import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchForHotels, getHotelById } from '../thunks/searchBarThunk';
import { HotelAmenity } from '../../pages/HotelPage';

type Hotel = {
  hotelName: string;
  description: string;
  imageUrl: string;
  location: string;
  longitude: number;
  latitude: number;
  starRating: number;
  availableRooms: number;
  amenities: HotelAmenity[];
}

interface SearchBarState {
  searchedHotels: Hotel[] | null;
  hotel: Hotel | null;
  isError: boolean;
  loading: boolean;
}

const initialState: SearchBarState = {
  searchedHotels: null,
  hotel: null,
  isError: false,
  loading: false,
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    // Reducers for search for hotels action
    builder.addCase(searchForHotels.fulfilled, (state, action) => {
      state.searchedHotels = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(searchForHotels.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(searchForHotels.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
    // Reducers for hotel action
    builder.addCase(getHotelById.fulfilled, (state, action: PayloadAction<Hotel>) => {
      state.hotel = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(getHotelById.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(getHotelById.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { reset } = searchBarSlice.actions;
export default searchBarSlice.reducer;
