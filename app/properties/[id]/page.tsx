import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getProperty, formatPrice } from '@/lib/api';
import { STATUS_LABELS, TYPE_LABELS } from '@/types/property';
import PropertyMapClient from '@/components/PropertyMapClient';
import WhatsAppButton from '@/components/WhatsAppButton';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) return { title: 'Propiedad no encontrada' };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.imageUrls?.[0] ? [property.imageUrls[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  const whatsappMsg = encodeURIComponent(
    `Hola Andrea, me interesa la propiedad: *${property.title}*. ¿Podría darme más información?`,
  );

  return (
    <>
      {/* Pass property title to WhatsApp button via client wrapper */}
      <WhatsAppButton propertyTitle={property.title} />

      <div style={{ minHeight: '100vh', background: 'var(--brand-cream)', paddingTop: '72px' }}>
        {/* Image Gallery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: property.imageUrls?.length > 1 ? '1fr 1fr' : '1fr',
            gridTemplateRows: '480px',
            gap: '4px',
            maxHeight: '480px',
            overflow: 'hidden',
          }}
          className="property-gallery-grid"
        >
          {property.imageUrls?.slice(0, 3).map((url, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                gridColumn: i === 0 && property.imageUrls.length > 1 ? '1' : undefined,
                gridRow: i === 0 && property.imageUrls.length > 2 ? '1 / span 2' : undefined,
                display: i >= 2 && property.imageUrls.length <= 2 ? 'none' : 'block',
              }}
            >
              <Image
                src={url}
                alt={`${property.title} - imagen ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }} className="property-detail-grid">
            {/* Left column */}
            <div>
              {/* Breadcrumb */}
              <p style={{ color: 'var(--brand-slate)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <a href="/" style={{ color: 'var(--brand-gold)', textDecoration: 'none' }}>Inicio</a>
                {' / '}
                <a href="/properties" style={{ color: 'var(--brand-gold)', textDecoration: 'none' }}>Propiedades</a>
                {' / '}{property.title}
              </p>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ background: property.status === 'for_sale' ? '#10b981' : property.status === 'rented' ? '#3b82f6' : '#ef4444', color: 'white', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {STATUS_LABELS[property.status]}
                </span>
                <span style={{ background: 'var(--brand-navy)', color: 'white', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {TYPE_LABELS[property.type]}
                </span>
                {property.featured && (
                  <span style={{ background: 'var(--brand-gold)', color: 'var(--brand-dark)', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                    Destacada
                  </span>
                )}
              </div>

              <h1 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                {property.title}
              </h1>

              <p style={{ color: 'var(--brand-slate)', marginBottom: '1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Ubicación: {property.location}
              </p>

              {/* Amenities grid */}
              {property.amenities && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  {[
                    { icon: 'Hab', value: property.amenities.bedrooms, label: 'Habitaciones' },
                    { icon: 'Baños', value: property.amenities.bathrooms, label: 'Baños' },
                    { icon: 'Sup', value: `${property.amenities.squareMeters} m²`, label: 'Superficie' },
                    property.amenities.parking && { icon: 'Cochera', value: 'Sí', label: 'Cochera' },
                    property.amenities.pool && { icon: 'Piscina', value: 'Sí', label: 'Piscina' },
                    property.amenities.garage && { icon: 'Garaje', value: 'Sí', label: 'Garaje' },
                    property.amenities.garden && { icon: 'Jardín', value: 'Sí', label: 'Jardín' },
                    property.amenities.terrace && { icon: 'Terraza', value: 'Sí', label: 'Terraza' },
                    property.amenities.airConditioning && { icon: 'A/C', value: 'Sí', label: 'A/C' },
                    property.amenities.furnished && { icon: 'Amob.', value: 'Sí', label: 'Amoblado' },
                  ]
                    .filter(Boolean)
                    .map((item: any) => (
                      <div key={item.label} style={{ background: 'white', padding: '1rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(201,168,76,0.1)' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--brand-dark)', marginBottom: '0.4rem' }}>{item.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--brand-dark)' }}>{item.value}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--brand-slate)', marginTop: '2px' }}>{item.label}</div>
                      </div>
                    ))}
                </div>
              )}

              {/* Description */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '1rem' }}>Descripción</h2>
                <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '0.975rem', whiteSpace: 'pre-line' }}>{property.description}</p>
              </div>

              {/* Map */}
              {property.latitude && property.longitude && (
                <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '1rem' }}>Ubicación</h2>
                  <PropertyMapClient
                    latitude={property.latitude}
                    longitude={property.longitude}
                    title={property.title}
                  />
                </div>
              )}
            </div>

            {/* Right column: sticky contact card */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <p style={{ color: 'var(--brand-slate)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Precio</p>
                <p className="font-display" style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '0.25rem' }}>
                  {formatPrice(property.price)}
                </p>
                {property.amenities?.squareMeters && (
                  <p style={{ color: 'var(--brand-slate)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    USD {Math.round(property.price / property.amenities.squareMeters).toLocaleString('es-AR')} / m²
                  </p>
                )}

                <div style={{ width: '100%', height: '1px', background: '#f1f5f9', marginBottom: '1.5rem' }} />

                <p style={{ fontWeight: 600, color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>¿Te interesa esta propiedad?</p>
                <p style={{ color: 'var(--brand-slate)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Contactate directamente con Andrea para más información o para agendar una visita.
                </p>

                <a
                  id={`whatsapp-property-${property.id}`}
                  href={`https://wa.me/543447497062?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '1rem',
                    background: '#25d366',
                    color: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>

                <a
                  href={`tel:+543447497062`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.875rem',
                    background: 'transparent',
                    color: 'var(--brand-dark)',
                    border: '2px solid var(--brand-gold)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s',
                  }}
                >
                  Llamar al +54 3447 497062
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .property-detail-grid { grid-template-columns: 1fr !important; }
          .property-gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: 280px !important; }
        }
      `}</style>
    </>
  );
}
