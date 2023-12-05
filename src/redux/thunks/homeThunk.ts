import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApiUrls } from '../../api/usersAPI';

const { featuredHotelsRoute } = userApiUrls;

export const featuredHotels = createAsyncThunk('get-featured-hotels', async () => {
  try {
    const response = await fetch(featuredHotelsRoute, { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'An error occurred';
      throw errorMessage
    }
  } catch (error) {
    throw error
  }
});