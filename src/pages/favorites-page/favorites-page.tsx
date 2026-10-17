import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { selectOffers } from '../../store/selectors';
import OfferList from '../../components/offer-list/offer-list';
import { toggleFavorite } from '../../store/api-actions';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useSelector(selectOffers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const handleBookmarkClick = (offerId: string) => {
    dispatch(toggleFavorite(offerId));
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
