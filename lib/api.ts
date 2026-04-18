import { Property, PropertiesResponse } from '@/types/property';
import { mockProperties } from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_URL}/properties/featured`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return mockProperties.filter(p => p.featured);
    return res.json();
  } catch (error) {
    return mockProperties.filter(p => p.featured);
  }
}

export async function getProperties(params?: URLSearchParams): Promise<PropertiesResponse> {
  try {
    const query = params ? `?${params.toString()}` : '';
    const res = await fetch(`${API_URL}/properties${query}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return { data: mockProperties, meta: { total: mockProperties.length, page: 1, limit: 12, totalPages: 1 } };
    return res.json();
  } catch (error) {
    return { data: mockProperties, meta: { total: mockProperties.length, page: 1, limit: 12, totalPages: 1 } };
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/properties/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return mockProperties.find(p => p.id === id) || null;
    return res.json();
  } catch (error) {
    return mockProperties.find(p => p.id === id) || null;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}
