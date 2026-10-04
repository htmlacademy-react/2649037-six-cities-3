import { RootState } from './index';
import { createSelector } from 'reselect';
import { Offer } from '../types/offer';
export const selectCity = (state: RootState) => state.city;

export const selectOffers = (state: RootState) => state.offers;

export const selectOfferById = (state: RootState, id: string) =>
  state.offers.find((offer) => offer.id === id);

export const selectSort = (state: RootState) => state.sort;

export const selectOffersByCity = createSelector(
  [(state: RootState) => state.offers, (state: RootState) => state.city, (state: RootState) => state.sort],
  (offers, city, sort) => {
    const cityOffers = offers.filter((offer) => offer.city.name === city);

    switch (sort) {
      case 'Price: low to high':
        return [...cityOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...cityOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...cityOffers].sort((a, b) => b.rating - a.rating);
      default:
        return cityOffers;
    }
  }
);
export const selectIsOffersLoading = (state: RootState) => state.isOffersLoading;

export const selectCurrentOffer = (state: RootState) => state.currentOffer;

export const selectNearbyOffers = (state: RootState): Offer[] => state.nearbyOffers;
export const selectReviews = (state: RootState) => state.reviews;
export const selectActiveOfferId = (state: RootState) => state.activeOfferId;
