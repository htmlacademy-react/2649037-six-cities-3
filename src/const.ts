export enum AppRoute {
    Root = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
  }


export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export const TOKEN_KEY = 'six-cities-token';

export const DEFAULT_CITY = 'Paris';

export const DEFAULT_MAP_LOCATION: [number, number] = [52.374, 4.889];

