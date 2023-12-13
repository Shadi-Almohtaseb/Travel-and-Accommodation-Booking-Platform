import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./slices/userAuthSlice";
import homeSlice from "./slices/homeSlice";
import searchResults from "./slices/searchResultsSlice";
import searchBarSlice from "./slices/searchBarSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      authUser: authUserSlice,
      home: homeSlice,
      searchResults: searchResults,
      searchBar: searchBarSlice
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

