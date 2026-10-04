import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setActiveOffer } from '../../store/action';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({ offers }: OfferListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => dispatch(setActiveOffer(offer.id))}
          onMouseLeave={() => dispatch(setActiveOffer(null))}
        />
      ))}
    </div>
  );
}
export default OfferList;
