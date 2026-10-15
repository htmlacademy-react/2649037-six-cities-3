import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import userReducer from './slices/userSlice';
import dataReducer from './slices/dataSlice';
import { UserState } from './slices/userSlice';
import { DataState } from './slices/dataSlice';

const api = createAPI();

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export interface RootState {
  user: UserState;
  data: DataState;
}

export type AppDispatch = typeof store.dispatch;
