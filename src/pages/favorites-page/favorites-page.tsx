import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectFavoritesByCity,
  selectFavorites,
  selectAuthorizationStatus,
} from '../../store/selectors';
import { fetchFavorites, toggleFavorite } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import OfferList from '../../components/offer-list/offer-list';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoritesByCity = useAppSelector(selectFavoritesByCity);
  const favoriteOffers = useAppSelector(selectFavorites);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }

    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [authStatus, navigate, dispatch]);

  const handleBookmarkClick = (offerId: string) => {
    const offer = favoriteOffers.find((o) => o.id === offerId);
    if (!offer) {
      return;
    }

    dispatch(
      toggleFavorite({
        id: offer.id,
        isFavorite: !offer.isFavorite,
      })
    );
  };

  const cities = Object.entries(favoritesByCity);
  const isEmpty = cities.length === 0;

  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}>
      <main
        className={`page__main page__main--favorites ${
          isEmpty ? 'page__main--favorites-empty' : ''
        }`}
      >
        <div className="page__favorites-container container">
          <section className={`favorites ${isEmpty ? 'favorites--empty' : ''}`}>
            {isEmpty ? (
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future
                    trips.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cities.map(([city, offers]) => (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={AppRoute.Root}>
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <OfferList
                          offers={offers}
                          onBookmarkClick={handleBookmarkClick}
                          variant="favorites"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
