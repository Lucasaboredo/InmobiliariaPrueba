import { Property, PropertiesResponse } from '@/types/property';
import { mockProperties } from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Vercel build safety: Prevent Next.js from throwing ECONNREFUSED during static generation
const isLocalAPI = API_URL.includes('localhost') || API_URL.includes('127.0.0.1');
const bypassFetch = isLocalAPI && process.env.NODE_ENV === 'production';

export async function getFeaturedProperties(): Promise<Property[]> {
  if (bypassFetch) return mockProperties.filter(p => p.featured);
  try {
    const res = await fetch(`${API_URL}/properties/featured`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return mockProperties.filter(p => p.featured);
    return await res.json();
  } catch (error) {
    return mockProperties.filter(p => p.featured);
  }
}

export async function getProperties(params?: URLSearchParams): Promise<PropertiesResponse> {
  if (bypassFetch) return { data: mockProperties, meta: { total: mockProperties.length, page: 1, limit: 12, totalPages: 1 } };
  try {
    const query = params ? `?${params.toString()}` : '';
    const res = await fetch(`${API_URL}/properties${query}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return { data: mockProperties, meta: { total: mockProperties.length, page: 1, limit: 12, totalPages: 1 } };
    return await res.json();
  } catch (error) {
    return { data: mockProperties, meta: { total: mockProperties.length, page: 1, limit: 12, totalPages: 1 } };
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  if (bypassFetch) return mockProperties.find(p => p.id === id) || null;
  try {
    const res = await fetch(`${API_URL}/properties/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return mockProperties.find(p => p.id === id) || null;
    return await res.json();
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
