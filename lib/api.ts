import { Property, PropertiesResponse } from '@/types/property';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getFeaturedProperties(): Promise<Property[]> {
  const res = await fetch(`${API_URL}/properties/featured`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getProperties(params?: URLSearchParams): Promise<PropertiesResponse> {
  const query = params ? `?${params.toString()}` : '';
  const res = await fetch(`${API_URL}/properties${query}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) return { data: [], meta: { total: 0, page: 1, limit: 12, totalPages: 0 } };
  return res.json();
}

export async function getProperty(id: string): Promise<Property | null> {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}
