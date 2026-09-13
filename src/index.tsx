// src/store/reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from './action';
import { Offer } from '../mocks/offers';



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
  city: 'Paris',// по ТЗ — город по умолчанию
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
