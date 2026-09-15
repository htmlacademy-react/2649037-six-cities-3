import { useEffect, useRef } from 'react';
import { layerGroup, Marker } from 'leaflet';
import { DEFAULT_MAP_LOCATION } from '../../const';
import useMap from '../../hooks/use-map';
import { Offer } from '../../mocks/offers';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
};

function Map({ offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const cityLocation = offers[0]?.city.location;
  const map = useMap(
    mapRef,
    cityLocation
      ? [cityLocation.latitude, cityLocation.longitude]
      : DEFAULT_MAP_LOCATION
  );

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      });

      marker.addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, offers]);

  return <div ref={mapRef} style={{ height: '100%' }} />;
}

export default Map;
