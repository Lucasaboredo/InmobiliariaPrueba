'use client';

import { useEffect, useRef } from 'react';

interface PropertyMapClientProps {
  latitude: number;
  longitude: number;
  title: string;
}

export default function PropertyMapClient({ latitude, longitude, title }: PropertyMapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css');

      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [latitude, longitude],
        zoom: 15,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`<strong>${title}</strong>`)
        .openPopup();

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, title]);

  return (
    <div
      ref={mapRef}
      id="property-map"
      style={{
        height: '360px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
      }}
    />
  );
}
