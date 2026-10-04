import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { Offer, Review } from '../types/offer';
import { changeCity, changeSort, setActiveOffer } from './action';
import { fetchOfferById, fetchOffers, fetchNearbyOffers, fetchReviews } from './api-actions';

export type CityName =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export type AuthorizationStatus = 'unauthorized' | 'authorized' | 'unknown';

export type State = {
  city: CityName;
  sort: SortType;
  authorizationStatus: AuthorizationStatus;
  offers: Offer[];
  isOffersLoading: boolean;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  activeOfferId: string | null;
};

export const initialState: State = {
  city: DEFAULT_CITY,
  sort: 'Popular',
  authorizationStatus: 'unknown',
  offers: [],
  isOffersLoading: false,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  activeOfferId: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOfferId = action.payload;
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
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    });
});
