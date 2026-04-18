import { getProperties } from '@/lib/api';
import { mockProperties } from '@/lib/mock-data';
import MapaClient from './MapaClient';

export default async function MapaPage() {
  // Fetch properties from running backend
  const propertiesResponse = await getProperties(new URLSearchParams({ limit: '100' }));
  let properties = propertiesResponse.data || [];
  
  // MERGE mock properties for preview if backend is empty
  const dbHasMocks = properties.some((p: any) => p.id === 'mock-1');
  if (!dbHasMocks) {
    properties = [...properties, ...mockProperties];
  }

  return (
    <div style={{ paddingTop: '80px', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem', background: 'var(--brand-dark)', color: 'white' }}>
        <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Mapa de Propiedades</h1>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Navega por Concepción del Uruguay para ver los inmuebles disponibles.</p>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <MapaClient properties={properties} />
      </div>
    </div>
  );
}
