export enum AppRoute {
    Root = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
    DevArtist = '/dev-artist',
    DevGenre = '/dev-genre',
  }


export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export const DEFAULT_CITY = 'Amsterdam';

export const DEFAULT_MAP_LOCATION: [number, number] = [52.374, 4.889];

