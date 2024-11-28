import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface LocationMapProps {
  latitude: number;
  longitude: number;
  onLocationSelect?: (lat: number, lng: number) => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  latitude,
  longitude,
  onLocationSelect,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      });

      const google = await loader.load();
      const position = { lat: latitude, lng: longitude };

      if (mapRef.current) {
        googleMapRef.current = new google.maps.Map(mapRef.current, {
          center: position,
          zoom: 15,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        const marker = new google.maps.Marker({
          position,
          map: googleMapRef.current,
          draggable: !!onLocationSelect,
        });

        if (onLocationSelect) {
          marker.addListener('dragend', () => {
            const position = marker.getPosition();
            if (position) {
              onLocationSelect(position.lat(), position.lng());
            }
          });
        }
      }
    };

    initMap();
  }, [latitude, longitude, onLocationSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-sm"
    />
  );
};