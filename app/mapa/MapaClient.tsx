'use client';

import dynamic from 'next/dynamic';
import { Property } from '@/types/property';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { 
  ssr: false, 
  loading: () => <div style={{ height: 'calc(100vh - 80px)', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} /> 
});

export default function MapaClient({ properties }: { properties: Property[] }) {
  return <PropertyMap properties={properties} fullHeight />;
}
