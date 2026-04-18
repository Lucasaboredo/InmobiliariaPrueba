'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';
import L from 'leaflet';
import { formatPrice } from '@/lib/api';

// Enforce bounds programmatically to ensure it works beyond hot reloads
function MapBoundsEnforcer({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setMaxBounds(bounds);
    map.options.maxBoundsViscosity = 1.0;
    map.options.minZoom = 13;
  }, [map, bounds]);
  return null;
}

export default function PropertyMap({ properties, fullHeight = false }: { properties: Property[], fullHeight?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix default marker icons for Leaflet in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: fullHeight ? '100%' : '500px', background: '#e5e7eb', borderRadius: fullHeight ? '0' : '16px', animation: 'pulse 1.5s infinite' }} />;

  const propertiesWithLocation = properties.filter(p => p.latitude != null && p.longitude != null);
  
  // Default center: Concepción del Uruguay
  const centerPosition: [number, number] = [-32.4839, -58.2372];
  
  // Strict Bounds limitadas a Concepción del Uruguay (ampliadas para permitir mayor desplazamiento)
  const mapBounds: L.LatLngBoundsExpression = [
    [-32.5500, -58.3200], // Sudoeste (Más al oeste y sur, abarcando suburbios)
    [-32.4000, -58.1500], // Noreste (Hacia ruta 14)
  ];

  return (
    <div style={{ borderRadius: fullHeight ? '0' : '16px', overflow: 'hidden', height: fullHeight ? '100%' : '500px', border: fullHeight ? 'none' : '1px solid #e5e7eb', boxShadow: fullHeight ? 'none' : '0 4px 20px rgba(0,0,0,0.06)', zIndex: 0 }}>
      <MapContainer 
        center={centerPosition} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
      >
        <MapBoundsEnforcer bounds={mapBounds} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {propertiesWithLocation.map((prop) => (
          <Marker key={prop.id} position={[prop.latitude as number, prop.longitude as number]}>
            <Popup minWidth={260} maxWidth={320}>
              <div style={{ minWidth: '240px', padding: '0px' }}>
                <img src={prop.imageUrls[0]} alt={prop.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontWeight: 'bold', margin: '0', fontSize: '15px', color: 'var(--brand-dark)', lineHeight: '1.2' }}>{prop.title}</h4>
                  <span style={{ background: prop.status === 'for_sale' ? 'var(--brand-gold)' : '#e5e7eb', color: prop.status === 'for_sale' ? 'var(--brand-dark)' : '#374151', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>
                    {prop.status === 'for_sale' ? 'En Venta' : prop.status === 'rented' ? 'Alquilada' : 'Vendida'}
                  </span>
                </div>
                
                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--brand-slate)' }}>📍 {prop.location}</p>
                
                {prop.amenities && (
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', padding: '8px', background: '#f8fafc', borderRadius: '6px', fontSize: '11px', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span title="Dormitorios">🛏️</span> {prop.amenities.bedrooms}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span title="Baños">🚿</span> {prop.amenities.bathrooms}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span title="Metros cuadrados">📐</span> {prop.amenities.squareMeters}m²
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--brand-gold)', fontSize: '16px' }}>{formatPrice(prop.price)}</span>
                  <a href={`/properties/${prop.id}`} style={{ fontSize: '13px', color: 'white', background: 'var(--brand-navy)', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Ver ficha completa</a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
