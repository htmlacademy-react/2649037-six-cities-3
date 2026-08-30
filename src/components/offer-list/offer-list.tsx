import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../mocks/offers';

type OfferListProps = {
  offers: Offer[];
  onOfferHover?: (id: number | null) => void;
};

function OfferList({ offers, onOfferHover }: OfferListProps): JSX.Element {
  return (
    <div className="places__list">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(id) => onOfferHover?.(id)}
          onMouseLeave={() => onOfferHover?.(null)}
        />
      ))}
    </div>
  );
}
export default OfferList;
