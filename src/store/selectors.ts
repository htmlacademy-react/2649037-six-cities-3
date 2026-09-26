import { RootState } from './index';
import { createSelector } from 'reselect';
import { Offer } from '../types/offer';
export const selectCity = (state: RootState) => state.city;

export const selectOffers = (state: RootState) => state.offers;

export const selectOfferById = (state: RootState, id: string) =>
  state.offers.find((offer) => offer.id === id);

export const selectOffersByCity = createSelector(
  [(state: RootState) => state.offers, (state: RootState) => state.city],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);
export const selectIsOffersLoading = (state: RootState) => state.isOffersLoading;

export const selectCurrentOffer = (state: RootState) => state.currentOffer;

export const selectNearbyOffers = (state: RootState): Offer[] => state.nearbyOffers;

