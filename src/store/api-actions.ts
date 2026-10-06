import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, Review } from '../types/offer';
import { AxiosInstance } from 'axios';
import { setAuthorizationStatus, setUser, UserInfo } from './action';
import { AuthorizationStatus } from '../const';

type Extra = {
  extra: AxiosInstance;
};

type LoginPayload = {
  email: string;
  password: string;
};

export const checkAuthStatus = createAsyncThunk<void, undefined, Extra>(
  'app/checkAuthStatus',
  async (_arg, { extra: api, dispatch }) => {
    try {
      const { data } = await api.get<UserInfo>('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const login = createAsyncThunk<UserInfo, LoginPayload, Extra>(
  'app/login',
  async ({ email, password }, { extra: api, dispatch }) => {
    const { data } = await api.post<UserInfo>('/login', { email, password });

    localStorage.setItem('token', data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));

    return data;
  },
);

export const fetchReviews = createAsyncThunk<Review[], string, Extra>(
  'data/fetchReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${id}`);

    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, Extra>(
  'data/fetchNearbyOffers',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);

    return data;
  }
);

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  Extra
>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');

    return data;
  }
);

export const fetchOfferById = createAsyncThunk<Offer, string, Extra>(
  'data/fetchOfferById',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer>(`/offers/${id}`);

    return data;
  }
);

