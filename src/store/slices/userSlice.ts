import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/offer';
import { AuthorizationStatus } from '../../const';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
});

export const { setAuthorizationStatus, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
