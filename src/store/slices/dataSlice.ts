import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, Review } from '../../types/offer';
import { DEFAULT_CITY } from '../../const';
import {
  fetchOfferById,
  fetchOffers,
  fetchNearbyOffers,
  fetchReviews,
  postReview,
  toggleFavorite,
} from '../api-actions';

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

export type DataState = {
  city: CityName;
  sort: SortType;
  offers: Offer[];
  isOffersLoading: boolean;
  currentOffer: Offer | null;
  isOfferLoading: boolean;
  nearbyOffers: Offer[];
  reviews: Review[];
  activeOfferId: string | null;
};

const initialState: DataState = {
  city: DEFAULT_CITY,
  sort: 'Popular',
  offers: [],
  isOffersLoading: false,
  currentOffer: null,
  isOfferLoading: false,
  nearbyOffers: [],
  reviews: [],
  activeOfferId: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<CityName>) {
      state.city = action.payload;
    },
    changeSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setActiveOffer(state, action: PayloadAction<string | null>) {
      state.activeOfferId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchOfferById.pending, (state) => {
        state.isOfferLoading = true;
        state.currentOffer = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updated = action.payload;

        const inOffers = state.offers.find((o) => o.id === updated.id);
        if (inOffers) {
          inOffers.isFavorite = updated.isFavorite;
        }

        const inNearby = state.nearbyOffers.find((o) => o.id === updated.id);
        if (inNearby) {
          inNearby.isFavorite = updated.isFavorite;
        }

        if (state.currentOffer?.id === updated.id) {
          state.currentOffer.isFavorite = updated.isFavorite;
        }
      });
  },
});

export const { changeCity, changeSort, setActiveOffer } = dataSlice.actions;
export default dataSlice.reducer;
