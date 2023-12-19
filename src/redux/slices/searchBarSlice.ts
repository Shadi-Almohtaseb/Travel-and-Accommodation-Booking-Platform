import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchForHotels, getHotelById, getRoomsOfHotel, getHotelImages, getHotels } from '../thunks/searchBarThunk';
import { HotelImage, Room, SearchedHotel, SearchResultHotel } from '../../@types/hotel';

interface SearchBarState {
  searchedHotels: SearchedHotel[] | null;
  searchResults: SearchResultHotel[] | null;
  hotel: SearchedHotel | null;
  rooms: Room[] | null;
  hotelImages: HotelImage[] | null;
  isError: boolean;
  loading: boolean;
}

const initialState: SearchBarState = {
  searchedHotels: null,
  searchResults: null,
  hotel: null,
  rooms: null,
  hotelImages: null,
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
    builder.addCase(searchForHotels.fulfilled, (state, action: PayloadAction<SearchedHotel[]>) => {
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
    // Reducers for search for hotels action
    builder.addCase(getHotels.fulfilled, (state, action: PayloadAction<SearchResultHotel[]>) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(getHotels.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(getHotels.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
    // Reducers for hotel action
    builder.addCase(getHotelById.fulfilled, (state, action: PayloadAction<SearchedHotel>) => {
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
    // Reducers for rooms action
    builder.addCase(getRoomsOfHotel.fulfilled, (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(getRoomsOfHotel.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(getRoomsOfHotel.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
    // Reducers for hotelImages action
    builder.addCase(getHotelImages.fulfilled, (state, action: PayloadAction<HotelImage[]>) => {
      state.hotelImages = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(getHotelImages.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(getHotelImages.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });

  },
});

export const { reset } = searchBarSlice.actions;
export default searchBarSlice.reducer;
