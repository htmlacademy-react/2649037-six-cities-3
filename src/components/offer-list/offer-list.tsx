import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setActiveOffer } from '../../store/slices/dataSlice';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
  onBookmarkClick?: (offerId: string) => void;
  variant?: 'main' | 'favorites';
};

function OfferList({ offers, onBookmarkClick, variant = 'main' }: OfferListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => dispatch(setActiveOffer(offer.id))}
          onMouseLeave={() => dispatch(setActiveOffer(null))}
          onBookmarkClick={() => onBookmarkClick?.(offer.id)}
          variant={variant}
        />
      ))}
    </div>
  );
}
export default OfferList;
