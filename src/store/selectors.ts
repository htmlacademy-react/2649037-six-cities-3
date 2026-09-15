import { RootState } from './index';
import { Offer } from '../mocks/offers';

export const selectCity = (state: RootState) => state.city;

export const selectOffers = (state: RootState) => state.offers;

export const selectOfferById = (state: RootState, id: number): Offer | undefined =>
  state.offers.find((offer) => offer.id === id);

export const selectOffersByCity = (state: RootState) =>
  state.offers.filter((offer) => offer.city.name === state.city);
