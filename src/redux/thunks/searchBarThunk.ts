import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchBarApiUrls } from '../../api/searchBarAPIs';

const { searchHotelsRoute, getHotelRoute } = searchBarApiUrls;

export const searchForHotels = createAsyncThunk('search-hotels', async (hotelName: string, { rejectWithValue }) => {
  try {
    const response = await fetch(searchHotelsRoute(hotelName), { method: 'GET' });
    if (hotelName === '') {
      return []
    }
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'An error occurred';
      throw errorMessage
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getHotelById = createAsyncThunk('get-hotel', async (hotelId: number, { rejectWithValue }) => {
  try {
    const response = await fetch(getHotelRoute(hotelId), { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'An error occurred';
      throw errorMessage
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});