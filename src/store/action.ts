import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { CityName } from './reducer';

export const changeCity = createAction<CityName>('app/changeCity');
export const loadOffers = createAction<Offer[]>('app/loadOffers');
