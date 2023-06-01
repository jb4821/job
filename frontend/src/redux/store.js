import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userReducer from './slices/userSlice'
import { authSlice } from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { jobSlice } from "./slices/jobSlice";

const persistConfig = {
  key: "root",
  whitelist: ["auth", "jobs"],
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  jobs: jobSlice.reducer,
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
