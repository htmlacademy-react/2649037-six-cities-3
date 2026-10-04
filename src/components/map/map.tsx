import { useEffect, useRef } from 'react';
import { layerGroup, Marker, icon } from 'leaflet';
import { DEFAULT_MAP_LOCATION } from '../../const';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectActiveOfferId } from '../../store/selectors';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
};

// Кастомные иконки маркеров
const DEFAULT_ICON = icon({
  iconUrl: 'img/pin.svg',
  iconSize: [34, 38],
  iconAnchor: [17, 38],
});

const ACTIVE_ICON = icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [34, 38],
  iconAnchor: [17, 38],
});

function MapComponent({ offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const activeOfferId = useAppSelector(selectActiveOfferId);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  // координаты города
  const cityLocation = offers[0]?.city.location;

  const map = useMap(
    mapRef,
    cityLocation
      ? [cityLocation.latitude, cityLocation.longitude]
      : DEFAULT_MAP_LOCATION
  );

  // ДВИГАЕМ КАРТУ ПРИ СМЕНЕ ГОРОДА
  useEffect(() => {
    if (map && cityLocation) {
      map.setView(
        [cityLocation.latitude, cityLocation.longitude],
        cityLocation.zoom
      );
    }
  }, [map, cityLocation]);

  // Обновляем маркеры
  useEffect(() => {
    if (!map) {
      return;
    }

    const markers = markersRef.current;
    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const marker = new Marker(
        [offer.location.latitude, offer.location.longitude],
        {
          icon: offer.id === activeOfferId ? ACTIVE_ICON : DEFAULT_ICON,
        }
      );

      marker.addTo(markerLayer);
      markers.set(offer.id, marker);
    });

    return () => {
      map.removeLayer(markerLayer);
      markers.clear();
    };
  }, [map, offers, activeOfferId]);

  return <div ref={mapRef} style={{ height: '100%' }} />;
}

export default MapComponent;
