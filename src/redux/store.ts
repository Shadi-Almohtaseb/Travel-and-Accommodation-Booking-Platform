import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./slices/userAuthSlice";

const makeStore = () => {
    return configureStore({
        reducer: {
            authUser: authUserSlice,
        },
    });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

