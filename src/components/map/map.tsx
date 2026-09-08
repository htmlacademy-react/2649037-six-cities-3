import {useEffect, useRef} from 'react';
import {layerGroup, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import {Offer} from '../../mocks/offers';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
};

function Map({offers}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // центр Амстердама
  const map = useMap(mapRef, [52.374, 4.889]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });

      marker.addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, offers]);

  return <div ref={mapRef} style={{height: '500px'}} />;
}

export default Map;
