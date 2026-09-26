export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email?: string;
  token?: string;
};

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type Offer = {
  id: string; // UUID
  title: string;
  type: string;
  price: number;


  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };

  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };

  isFavorite: boolean;
  isPremium: boolean;
  rating: number;

  previewImage: string;
  images: string[];

  goods: string[];

  host: User;

  description: string;
  bedrooms: number;
  maxAdults: number;
};
