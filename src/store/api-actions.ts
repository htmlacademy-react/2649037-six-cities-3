import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AxiosInstance } from 'axios';
import { loadOffers } from './action';

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'data/fetchOffers',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(loadOffers(data));
    return data;
  }
);
