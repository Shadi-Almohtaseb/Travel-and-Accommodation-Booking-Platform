import { createSlice } from '@reduxjs/toolkit';
import { getAllCitiesThunk } from '../thunks/cityThunk';

export type City = {
    id: number;
    name: string;
    description: string;
}

interface CityState {
    cities: City | [];
    isError: boolean;
    loading: boolean;
}

const initialState: CityState = {
    cities: [],
    isError: false,
    loading: false,
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        // Reducers for search for hotels action
        builder.addCase(getAllCitiesThunk.fulfilled, (state, action) => {
            state.cities = action.payload;
            state.loading = false;
            state.isError = false;
        });
        builder.addCase(getAllCitiesThunk.pending, (state) => {
            state.loading = true;
            state.isError = false;
        });
        builder.addCase(getAllCitiesThunk.rejected, (state) => {
            state.loading = false;
            state.isError = true;
        });
    },
});

export const { reset } = citySlice.actions;
export default citySlice.reducer;
