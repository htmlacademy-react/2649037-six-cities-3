import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { Offer } from '../types/offer';
import { changeCity } from './action';
import { fetchOfferById, fetchOffers } from './api-actions';

export type CityName =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

export type State = {
  city: CityName;
  offers: Offer[];
  isOffersLoading: boolean;
  currentOffer: Offer | null;
};

export const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  currentOffer: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(fetchOfferById.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
    });
});
