
export type Offer = {
  id: number;
  title: string;
  description: string;
  type: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;

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

  previewImage: string;
  images: string[];

  bedrooms: number;
  maxAdults: number;

  goods: string[];

  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };

  nearPlaces: number[]; // id похожих предложений
};

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious studio at great location',
    description: 'A quiet cozy and picturesque place near the river.',
    type: 'apartment',
    price: 120,
    rating: 4.8,
    isPremium: true,
    isFavorite: true,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.889,
        zoom: 12,
      },
    },

    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },

    previewImage: 'https://picsum.photos/300/200?random=1',
    images: [
      'https://picsum.photos/300/200?random=11',
      'https://picsum.photos/300/200?random=12',
      'https://picsum.photos/300/200?random=13',
      'https://picsum.photos/300/200?random=14',
      'https://picsum.photos/300/200?random=15',
    ],

    bedrooms: 3,
    maxAdults: 4,

    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cable TV',
      'Fridge',
    ],

    host: {
      name: 'Angelina',
      avatarUrl: 'https://picsum.photos/74/74?random=100',
      isPro: true,
    },

    nearPlaces: [2, 3],
  },

  {
    id: 2,
    title: 'Cozy room in the city center',
    description: 'Perfect for a short stay.',
    type: 'room',
    price: 80,
    rating: 4.2,
    isPremium: false,
    isFavorite: false,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.889,
        zoom: 12,
      },
    },

    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },

    previewImage: 'https://picsum.photos/300/200?random=2',
    images: [
      'https://picsum.photos/300/200?random=21',
      'https://picsum.photos/300/200?random=22',
      'https://picsum.photos/300/200?random=23',
    ],

    bedrooms: 1,
    maxAdults: 2,

    goods: ['Wi-Fi', 'Heating', 'Fridge'],

    host: {
      name: 'Max',
      avatarUrl: 'https://picsum.photos/74/74?random=101',
      isPro: false,
    },

    nearPlaces: [1, 3],
  },

  {
    id: 3,
    title: 'Modern apartment with canal view',
    description: 'Amazing view and modern interior.',
    type: 'apartment',
    price: 150,
    rating: 4.9,
    isPremium: true,
    isFavorite: false,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.889,
        zoom: 12,
      },
    },

    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },

    previewImage: 'https://picsum.photos/300/200?random=3',
    images: [
      'https://picsum.photos/300/200?random=31',
      'https://picsum.photos/300/200?random=32',
      'https://picsum.photos/300/200?random=33',
    ],

    bedrooms: 2,
    maxAdults: 3,

    goods: ['Wi-Fi', 'Kitchen', 'Dishwasher', 'Cable TV'],

    host: {
      name: 'Sophie',
      avatarUrl: 'https://picsum.photos/74/74?random=102',
      isPro: true,
    },

    nearPlaces: [1],
  },

  {
    id: 4,
    title: 'Quiet house in the suburbs',
    description: 'Perfect for families.',
    type: 'house',
    price: 200,
    rating: 4.7,
    isPremium: false,
    isFavorite: true,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.889,
        zoom: 12,
      },
    },

    location: {
      latitude: 52.3809553943508,
      longitude: 4.849309666406198,
      zoom: 8,
    },

    previewImage: 'https://picsum.photos/300/200?random=4',
    images: [
      'https://picsum.photos/300/200?random=41',
      'https://picsum.photos/300/200?random=42',
      'https://picsum.photos/300/200?random=43',
    ],

    bedrooms: 4,
    maxAdults: 6,

    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge'],

    host: {
      name: 'John',
      avatarUrl: 'https://picsum.photos/74/74?random=103',
      isPro: false,
    },

    nearPlaces: [1, 2],
  },
];

