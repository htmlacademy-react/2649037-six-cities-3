import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, Review } from '../types/offer';
import axios, { AxiosInstance } from 'axios';
import { setAuthorizationStatus } from './action';

type Extra = {
  extra: AxiosInstance;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthInfo = {
  token: string;
};

export const checkAuthStatus = createAsyncThunk<void, undefined, Extra>(
  'app/checkAuthStatus',
  async (_arg, { extra: api, dispatch }) => {
    try {
      await api.get('/login');
      dispatch(setAuthorizationStatus('authorized'));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(setAuthorizationStatus('unauthorized'));
      } else {
        dispatch(setAuthorizationStatus('unauthorized'));
      }
    }
  },
);

export const login = createAsyncThunk<AuthInfo, LoginPayload, Extra>(
  'app/login',
  async ({ email, password }, { extra: api, dispatch }) => {
    const { data } = await api.post<AuthInfo>('/login', { email, password });

    localStorage.setItem('token', data.token);
    dispatch(setAuthorizationStatus('authorized'));

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

