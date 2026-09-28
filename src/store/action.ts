import { createAction } from '@reduxjs/toolkit';
import { CityName } from './reducer';

export const changeCity = createAction<CityName>('app/changeCity');
