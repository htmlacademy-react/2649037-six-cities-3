import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, Review, User } from '../types/offer';
import { AxiosInstance } from 'axios';
import { setAuthorizationStatus, setUser } from './slices/userSlice';
import { AuthorizationStatus, TOKEN_KEY } from '../const';

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
      const { data } = await api.get<User>('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const login = createAsyncThunk<User, LoginPayload, Extra>(
  'app/login',
  async ({ email, password }, { extra: api, dispatch }) => {
    const { data } = await api.post<User>('/login', { email, password });

    localStorage.setItem(TOKEN_KEY, data.token);
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

export type ReviewPayload = {
  id: string;
  rating: number;
  comment: string;
};

export const postReview = createAsyncThunk<Review, ReviewPayload, Extra>(
  'data/postReview',
  async ({ id, rating, comment }, { extra: api }) => {
    const { data } = await api.post<Review>(`/comments/${id}`, { rating, comment });

    return data;
  }
);


export type ToggleFavoritePayload = {
  id: string;
  isFavorite: boolean;
};

export const toggleFavorite = createAsyncThunk<Offer, ToggleFavoritePayload, Extra>(
  'data/toggleFavorite',
  async ({ id, isFavorite }, { extra: api }) => {
    const status = isFavorite ? 1 : 0;
    const { data } = await api.post<Offer>(`/favorite/${id}/${status}`);

    return data;
  }
);

export const fetchFavorites = createAsyncThunk<Offer[], undefined, Extra>(
  'data/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/favorite');

    return data;
  }
);
