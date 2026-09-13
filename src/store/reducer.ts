import { Offer } from '../mocks/offers';
import { DEFAULT_CITY } from '../const';

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
};

export const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],// пока пусто, заполним тестовыми данными через action
};

export type Action =
  | { type: 'changeCity'; payload: CityName }
  | { type: 'loadOffers'; payload: Offer[] };

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'changeCity':
      return {
        ...state,
        city: action.payload,
      };
    case 'loadOffers':
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
};
