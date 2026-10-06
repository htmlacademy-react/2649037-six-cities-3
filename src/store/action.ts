import { createAction } from '@reduxjs/toolkit';
import { CityName, SortType } from './reducer';
import { AuthorizationStatus } from '../const';

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export const changeCity = createAction<CityName>('app/changeCity');
export const changeSort = createAction<SortType>('app/changeSort');
export const setActiveOffer = createAction<string | null>('app/setActiveOffer');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('app/setAuthorizationStatus');
export const setUser = createAction<UserInfo | null>('app/setUser');
