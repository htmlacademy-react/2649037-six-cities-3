import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { Spinner } from '../../components/spinner/spinner';
import { changeCity } from '../../store/action';
import { selectCity, selectOffersByCity, selectOffers } from '../../store/selectors';
import { CityName } from '../../store/reducer';
import { CitiesList } from '../../components/cities-list/cities-list';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';


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

  const offers = useAppSelector(selectOffers);
  const activeCity = useAppSelector(selectCity);
  const cityOffers = useAppSelector(selectOffersByCity);

  // Если данные ещё не пришли — показываем спиннер
  if (offers.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      {/* ... остальная верстка ... */}

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
              <b className="places__found">
                {cityOffers.length} places to stay in {activeCity}
              </b>

              <div className="cities__places-list places__list tabs__content">
                <OfferList offers={cityOffers} />
              </div>
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={cityOffers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
