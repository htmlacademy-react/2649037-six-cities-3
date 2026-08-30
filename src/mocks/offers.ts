
export type Offer = {
  id: number;
  title: string;
  type: string;
  price: number;
  city: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  previewImage: string;
};

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: 'Amsterdam',
    isPremium: true,
    isFavorite: false,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: 2,
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    city: 'Amsterdam',
    isPremium: false,
    isFavorite: true,
    rating: 4.0,
    previewImage: 'img/room.jpg',
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    city: 'Amsterdam',
    isPremium: false,
    isFavorite: false,
    rating: 4.7,
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    city: 'Amsterdam',
    isPremium: true,
    isFavorite: true,
    rating: 5.0,
    previewImage: 'img/apartment-03.jpg',
  },
];
