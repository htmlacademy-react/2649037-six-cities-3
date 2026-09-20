import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
  onOfferHover?: (id: string | null) => void;
};

function OfferList({ offers, onOfferHover }: OfferListProps): JSX.Element {
  return (
    <div className="places__list">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onOfferHover?.(offer.id)}
          onMouseLeave={() => onOfferHover?.(null)}
        />
      ))}
    </div>
  );
}
export default OfferList;
