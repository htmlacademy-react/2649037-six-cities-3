import { DEFAULT_CITY } from '../const';
import { Offer } from '../types/offer';

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
export type Action =
  | { type: 'app/changeCity'; payload: CityName }
  | { type: 'app/loadOffers'; payload: Offer[] }
  | { type: 'app/setOffersLoading'; payload: boolean }
  | { type: 'data/fetchOfferById/fulfilled'; payload: Offer };

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'app/changeCity':
      return { ...state, city: action.payload };

    case 'app/loadOffers':
      return { ...state, offers: action.payload, isOffersLoading: false };

    case 'app/setOffersLoading':
      return { ...state, isOffersLoading: action.payload };

    case 'data/fetchOfferById/fulfilled':
      return { ...state, currentOffer: action.payload };

    default:
      return state;
  }
};
