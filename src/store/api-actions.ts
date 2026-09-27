import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, Review } from '../types/offer';
import { AxiosInstance } from 'axios';

type Extra = {
  extra: AxiosInstance;
};

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

