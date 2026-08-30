import { Link } from 'react-router-dom';
import { Offer } from '../../mocks/offers';
import { AppRoute } from '../../const';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: () => void;
};

function OfferCard({ offer, onMouseEnter, onMouseLeave }: OfferCardProps): JSX.Element {
  return (
    <article
      className="place-card"
      onMouseEnter={() => onMouseEnter?.(offer.id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="place-card__image-wrapper">
        <Link to={`${AppRoute.Offer.replace(':id', String(offer.id))}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt={offer.title}
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer.replace(':id', String(offer.id))}`}>
            {offer.title}
          </Link>
        </h2>

        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
