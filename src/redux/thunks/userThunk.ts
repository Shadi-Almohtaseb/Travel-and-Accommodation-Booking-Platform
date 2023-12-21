import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApiUrls } from '../../api/usersAPI';
import { UserAuth, UserLogin } from '../../@types/user'
import { JwtPayload, jwtDecode } from 'jwt-decode';

const { getUserRoute, signupUserRoute, loginUserRoute } = userApiUrls;

interface DecodedToken extends JwtPayload {
  userType: string;
  family_name: string;
  given_name: string;
}

const handleToken = (token: string): DecodedToken => {
  const decoded: DecodedToken = jwtDecode(token);
  return {
    userType: decoded.userType,
    family_name: decoded.family_name,
    given_name: decoded.given_name
  };
};

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

export const loginUser = createAsyncThunk('login-User', async (payload: UserLogin, { rejectWithValue }) => {
  try {
    const response = await fetch(loginUserRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      const userInfo: DecodedToken = handleToken(data.authentication);
      localStorage.setItem('User', JSON.stringify(userInfo));
      localStorage.setItem('pass', data.authentication);
      return userInfo;
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