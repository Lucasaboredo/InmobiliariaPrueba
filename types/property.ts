export interface PropertyAmenities {
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  parking: boolean;
  pool: boolean;
  garage: boolean;
  garden: boolean;
  terrace: boolean;
  airConditioning: boolean;
  furnished: boolean;
}

export type PropertyStatus = 'for_sale' | 'rented' | 'sold';
export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial' | 'office';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  latitude: number | null;
  longitude: number | null;
  imageUrls: string[];
  status: PropertyStatus;
  type: PropertyType;
  featured: boolean;
  amenities: PropertyAmenities;
  createdAt: string;
  updatedAt: string;
}

export interface PropertiesResponse {
  data: Property[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  for_sale: 'En Venta',
  rented: 'Alquilada',
  sold: 'Vendida',
};

export const TYPE_LABELS: Record<PropertyType, string> = {
  house: 'Casa',
  apartment: 'Departamento',
  land: 'Terreno',
  commercial: 'Local Comercial',
  office: 'Oficina',
};
