import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectFavorites,
  selectAuthorizationStatus,
} from '../../store/selectors';
import { toggleFavorite } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import OfferList from '../../components/offer-list/offer-list';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteOffers = useAppSelector(selectFavorites);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
  }, [authStatus, navigate]);

  const handleBookmarkClick = (offerId: string) => {
    const offer = favoriteOffers.find((o) => o.id === offerId);
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

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            {favoriteOffers.length === 0 ? (
              <p className="favorites__no-data">Nothing yet saved</p>
            ) : (
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__places">
                    <OfferList
                      offers={favoriteOffers}
                      onBookmarkClick={handleBookmarkClick}
                      variant="favorites"
                    />
                  </div>
                </li>
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
