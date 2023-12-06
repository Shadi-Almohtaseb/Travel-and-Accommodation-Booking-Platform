import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApiUrls } from '../../api/usersAPI';
import { UserAuth, UserLogin } from '../../@types/user'

const { getUserRoute, signupUserRoute, loginUserRoute } = userApiUrls;

export const fetchUser = createAsyncThunk('get-User', async (UserId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(getUserRoute(UserId), { method: 'GET' });
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

export const signupUser = createAsyncThunk('signup-User', async (payload: UserAuth, { rejectWithValue }) => {
  try {
    const response = await fetch(signupUserRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("User", JSON.stringify(data));
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

export const loginUser = createAsyncThunk('login-User', async (payload: UserLogin, { rejectWithValue }) => {
  try {
    const response = await fetch(loginUserRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });


    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("User", JSON.stringify(data));
      return data;
    } else {
      const errorStatus = response.status;

      try {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'An error occurred';
        throw errorMessage;
      } catch (jsonError) {
        if (errorStatus === 401) {
          throw 'Invalid email or password';
        } else {
          const errorText = await response.text();
          throw errorText || 'An error occurred';
        }
      }
    }
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const logoutUser = createAsyncThunk('logout-User', async (UserId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(getUserRoute(UserId), { method: 'GET' });
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