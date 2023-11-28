import { configureStore } from "@reduxjs/toolkit";
// import authShopSlice from "./slices/authShopSlice";

const makeStore = () => {
    return configureStore({
        reducer: {
            // authShop: authShopSlice,
        },
    });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

