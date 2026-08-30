import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../mocks/offers';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({ offers }: OfferListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  return (
    <div className="places__list">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={setActiveOfferId}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}

export default OfferList;
