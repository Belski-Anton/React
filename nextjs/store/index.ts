import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { api } from '../api/index';
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([api.middleware]),
})

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
