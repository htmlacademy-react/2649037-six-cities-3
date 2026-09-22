import { RootState } from './index';
import { createSelector } from 'reselect';
export const selectCity = (state: RootState) => state.city;

export const selectOffers = (state: RootState) => state.offers;

export const selectOfferById = (state: RootState, id: string) =>
  state.offers.find((offer) => offer.id === id);

export const selectOffersByCity = createSelector(
  [(state: RootState) => state.offers, (state: RootState) => state.city],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);
