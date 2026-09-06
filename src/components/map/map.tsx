import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Offer } from '../../mocks/offers';

type MapProps = {
  offers: Offer[];
};

function Map({ offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = L.map(mapRef.current).setView([52.374, 4.889], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // отображаем все предложения в виде маркеров
    offers.forEach((offer) => {
      L.marker([offer.location.latitude, offer.location.longitude]).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [offers]);

  return <div ref={mapRef} className="map" />;
}

export default Map;
