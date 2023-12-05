import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./slices/userAuthSlice";
import homeSlice from "./slices/homeSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      authUser: authUserSlice,
      home: homeSlice
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

