import { createAsyncThunk } from '@reduxjs/toolkit';
import { cityApiUrls } from '../../api/cityAPI';

const { getAllCities } = cityApiUrls;

export const getAllCitiesThunk = createAsyncThunk('get-all-cities', async () => {
  try {
    const response = await fetch(getAllCities, { method: 'GET' });
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
