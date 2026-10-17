import { RootState } from './index';
import { createSelector } from 'reselect';
import { Offer, User, Review } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { CityName, SortType } from './slices/dataSlice';

export const selectCity = (state: RootState): CityName => state.data.city;

export const selectOffers = (state: RootState): Offer[] => state.data.offers;

export const selectOfferById = (state: RootState, id: string): Offer | undefined =>
  state.data.offers.find((offer) => offer.id === id);

export const selectSort = (state: RootState): SortType => state.data.sort;

export const selectOffersByCity = createSelector(
  [
    (state: RootState) => state.data.offers,
    (state: RootState) => state.data.city,
    (state: RootState) => state.data.sort,
  ],
  (offers, city, sort): Offer[] => {
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

export const selectIsOffersLoading = (state: RootState): boolean => state.data.isOffersLoading;

export const selectIsOfferLoading = (state: RootState): boolean => state.data.isOfferLoading;

export const selectCurrentOffer = (state: RootState): Offer | null => state.data.currentOffer;

export const selectNearbyOffers = (state: RootState): Offer[] => state.data.nearbyOffers;

export const selectReviews = (state: RootState): Review[] => state.data.reviews;

export const selectAuthorizationStatus = (state: RootState): AuthorizationStatus => state.user.authorizationStatus;

export const selectUser = (state: RootState): User | null => state.user.user;

export const selectActiveOfferId = (state: RootState): string | null => state.data.activeOfferId;

export const selectFavorites = (state: RootState): Offer[] =>
  state.data.offers.filter((offer) => offer.isFavorite);

export const selectFavoriteCount = (state: RootState): number =>
  selectFavorites(state).length;

export const selectFavoritesByCity = createSelector(
  [selectFavorites],
  (favorites): Record<string, Offer[]> =>
    favorites.reduce<Record<string, Offer[]>>((acc, offer) => {
      const city = offer.city.name;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(offer);
      return acc;
    }, {})
);
