import {useEffect, useState, useRef} from 'react';
import L, {Map} from 'leaflet';

function useMap(
  mapRef: React.RefObject<HTMLElement | null>,
  center: [number, number]
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: center[0],
          lng: center[1]
        },
        zoom: 12
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, center]);

  return map;
}

export default useMap;
