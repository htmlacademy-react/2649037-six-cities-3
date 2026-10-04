import { createAction } from '@reduxjs/toolkit';
import { CityName, SortType } from './reducer';

export const changeCity = createAction<CityName>('app/changeCity');
export const changeSort = createAction<SortType>('app/changeSort');
export const setActiveOffer = createAction<string | null>('app/setActiveOffer');
