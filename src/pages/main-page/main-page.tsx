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

  // Спиннер пока нет данных
  if (offers.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
