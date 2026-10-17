import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { Spinner } from '../../components/spinner/spinner';
import { changeCity } from '../../store/slices/dataSlice';
import {
  selectCity,
  selectOffersByCity,
  selectIsOffersLoading,
} from '../../store/selectors';
import { CityName } from '../../store/slices/dataSlice';
import { CitiesList } from '../../components/cities-list/cities-list';
import OfferList from '../../components/offer-list/offer-list';
import MapComponent from '../../components/map/map';
import { SortOptions } from '../../components/sort-options/sort-options';
import { AppRoute, AuthorizationStatus } from '../../const';
import { toggleFavorite } from '../../store/api-actions';

const CITIES: CityName[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeCity = useAppSelector(selectCity);
  const cityOffers = useAppSelector(selectOffersByCity);
  const isOffersLoading = useAppSelector(selectIsOffersLoading);
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus,
  );

  const handleBookmarkClick = (offerId: string) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const offer = cityOffers.find((o) => o.id === offerId);
    if (!offer) {
      return;
    }

    dispatch(
      toggleFavorite({
        id: offer.id,
        isFavorite: !offer.isFavorite,
      }),
    );
  };

  // Спиннер пока идет загрузка
  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITIES}
              activeCity={activeCity}
              onCityChange={(city) => dispatch(changeCity(city))}
            />
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {cityOffers.length} places to stay in {activeCity}
              </b>

              <SortOptions />

              <OfferList
                offers={cityOffers}
                onBookmarkClick={handleBookmarkClick}
              />
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <MapComponent offers={cityOffers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
