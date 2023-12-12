import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchResultsApiUrls } from '../../api/searchResultsAPI';

const { searchResultsRoute } = searchResultsApiUrls;

export const searchResults = createAsyncThunk('search-results', async () => {
  try {
    const response = await fetch(searchResultsRoute, { method: 'GET' });
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
