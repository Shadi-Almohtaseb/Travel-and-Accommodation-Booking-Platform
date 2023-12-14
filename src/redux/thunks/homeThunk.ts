import { createAsyncThunk } from '@reduxjs/toolkit';
import { homeApiUrls } from '../../api/homeAPI';

const { featuredHotelsRoute, trendingHotelsRoute, UsersRecentlyVisitedRoute } = homeApiUrls;

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

export const trendingHotels = createAsyncThunk('get-trending-hotels', async () => {
  try {
    const response = await fetch(trendingHotelsRoute, { method: 'GET' });
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

export const recentlyVisitedHotels = createAsyncThunk('get-RecentlyVisited-hotels', async (userId: number) => {
  try {
    const response = await fetch(UsersRecentlyVisitedRoute(userId), { method: 'GET' });
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