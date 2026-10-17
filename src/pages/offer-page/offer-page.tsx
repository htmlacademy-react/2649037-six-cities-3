import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchReviews,
  postReview,
  toggleFavorite,
} from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectCurrentOffer,
  selectNearbyOffers,
  selectReviews,
  selectAuthorizationStatus,
  selectIsOfferLoading,
} from '../../store/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';

import NotFoundPage from '../not-found-page/not-found-page';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/review/reviews-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { Spinner } from '../../components/spinner/spinner';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  const offer = useAppSelector(selectCurrentOffer);
  const nearPlaces = useAppSelector(selectNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const isOfferLoading = useAppSelector(selectIsOfferLoading);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  const handleBookmarkClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(
      toggleFavorite({
        id: offer.id,
        isFavorite: !offer.isFavorite,
      }),
    );
  };

  const handleReviewSubmit = async (
    rating: number,
    comment: string,
  ): Promise<boolean> => {
    if (!id) {
      return false;
    }

    setIsSubmitting(true);
    setReviewError(null);

    try {
      await dispatch(postReview({ id, rating, comment })).unwrap();
      setIsSubmitting(false);
      return true;
    } catch {
      setReviewError('Не удалось отправить отзыв. Попробуйте ещё раз.');
      setIsSubmitting(false);
      return false;
    }
  };

  const handleNearbyBookmarkClick = (offerId: string) => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const nearbyOffer = nearPlaces.find((o) => o.id === offerId);
    if (!nearbyOffer) {
      return;
    }

    dispatch(
      toggleFavorite({
        id: nearbyOffer.id,
        isFavorite: !nearbyOffer.isFavorite,
      }),
    );
  };

  const limitedNearPlaces = nearPlaces.slice(0, 3);
  const mapOffers = [...limitedNearPlaces, offer];

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          {/* GALLERY */}
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images?.length ? (
                offer.images.map((img) => (
                  <div key={img} className="offer__image-wrapper">
                    <img className="offer__image" src={img} alt={offer.title} />
                  </div>
                ))
              ) : (
                <p className="offer__no-images">Нет изображений</p>
              )}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>

                <button
                  className={`offer__bookmark-button button ${
                    offer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms}{' '}
                  {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults}{' '}
                  {offer.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods?.length ? (
                    offer.goods.map((item) => (
                      <li key={item} className="offer__inside-item">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="offer__inside-item">
                      Нет данных о удобствах
                    </li>
                  )}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>

                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${
                      offer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host?.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>

                  <span className="offer__user-name">{offer.host?.name}</span>
                  {offer.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>

                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {authStatus === AuthorizationStatus.Auth && (
                  <ReviewForm
                    onSubmit={handleReviewSubmit}
                    isSubmitting={isSubmitting}
                    error={reviewError}
                  />
                )}
              </section>
            </div>
          </div>

          <section className="offer__map map">
            <Map offers={mapOffers} currentOfferId={offer.id} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighborhood
            </h2>

            <div className="near-places__list places__list">
              <OfferList
                offers={limitedNearPlaces}
                onBookmarkClick={handleNearbyBookmarkClick}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
