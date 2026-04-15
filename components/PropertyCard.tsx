'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property, STATUS_LABELS, TYPE_LABELS } from '@/types/property';
import { formatPrice } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage =
    property.imageUrls?.[0] ||
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600';

  const statusColors: Record<string, string> = {
    for_sale: '#10b981',
    rented: '#3b82f6',
    sold: '#ef4444',
  };

  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        className="property-card"
        style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(15, 25, 35, 0.08)',
          cursor: 'pointer',
          border: '1px solid rgba(201, 168, 76, 0.1)',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="property-card-img"
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                background: statusColors[property.status],
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {STATUS_LABELS[property.status]}
            </span>
            {property.featured && (
              <span
                style={{
                  background: 'var(--brand-gold)',
                  color: 'var(--brand-dark)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Destacada
              </span>
            )}
          </div>

          {/* Type tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(15, 25, 35, 0.8)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {TYPE_LABELS[property.type]}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem' }}>
          {/* Price */}
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--brand-dark)',
              margin: '0 0 0.25rem',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {formatPrice(property.price)}
          </p>

          {/* Title */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--brand-dark)',
              margin: '0 0 0.5rem',
              lineHeight: 1.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {property.title}
          </h3>

          {/* Location */}
          <p
            style={{
              color: 'var(--brand-slate)',
              fontSize: '0.85rem',
              margin: '0 0 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            Ubicación: {property.location}
          </p>

          {/* Amenities */}
          {property.amenities && (
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f1f5f9',
              }}
            >
              {property.amenities.bedrooms !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark)' }}>Hab:</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark)' }}>
                    {property.amenities.bedrooms}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-slate)' }}>hab.</span>
                </div>
              )}
              {property.amenities.bathrooms !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark)' }}>Baños:</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark)' }}>
                    {property.amenities.bathrooms}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-slate)' }}>baños</span>
                </div>
              )}
              {property.amenities.squareMeters !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark)' }}>Sup:</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark)' }}>
                    {property.amenities.squareMeters}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-slate)' }}>m²</span>
                </div>
              )}
              {property.amenities.pool && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark)' }}>Piscina</span>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
