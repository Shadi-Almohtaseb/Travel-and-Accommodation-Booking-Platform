import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchBarApiUrls } from '../../api/searchBarAPIs';

const { searchHotelsRoute, getHotelRoute, getRoomsOfHotelRoute, getImagesOfHotelRoute, getHotelsRoute } = searchBarApiUrls;

export interface SearchParams {
  city?: string;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
}

export const searchForHotels = createAsyncThunk('search-hotels', async (params: SearchParams, { rejectWithValue }) => {
  const { city, checkInDate, checkOutDate, adults, children } = params;

  try {
    const response = await fetch(searchHotelsRoute(
      city || '',
      checkInDate || '',
      checkOutDate || '',
      adults || 0,
      children || 0
    ), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('pass')}`
      },
    });

    if (city === '' || checkInDate === '' || checkOutDate === '' || adults === 0 || children === 0) {
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

export const getHotels = createAsyncThunk('get-hotels', async () => {
  try {
    const response = await fetch(getHotelsRoute, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'An error occurred';
      throw errorMessage
    }
  } catch (error) {
    throw error;
  }
});


export const getHotelById = createAsyncThunk('get-hotel', async (hotelId: number, { rejectWithValue }) => {
  try {
    const response = await fetch(getHotelRoute(hotelId), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('pass')}`
      },
    });
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

export const getRoomsOfHotel = createAsyncThunk('get-rooms-of-hotel', async (hotelId: number, { rejectWithValue }) => {
  try {
    const response = await fetch(getRoomsOfHotelRoute(hotelId), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('pass')}`
      },
    });
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

export const getHotelImages = createAsyncThunk('get-hotel-images', async (hotelId: number, { rejectWithValue }) => {
  try {
    const response = await fetch(getImagesOfHotelRoute(hotelId), {
      method: 'GET',

    });
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