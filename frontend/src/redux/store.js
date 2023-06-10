import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { jobSlice } from "./slices/jobSlice";
import { searchSlice } from "./slices/searchSlice";

const persistConfig = {
  key: "root",
  whitelist: ["auth", "jobs", "search"],
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  jobs: jobSlice.reducer,
  search: searchSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
