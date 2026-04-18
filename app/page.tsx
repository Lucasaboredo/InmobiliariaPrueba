import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { getFeaturedProperties } from '@/lib/api';
import Link from 'next/link';

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      <Hero />

      {/* Featured Properties section */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--brand-cream)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p
              style={{
                color: 'var(--brand-gold)',
                fontSize: '0.8rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
              Selección exclusiva
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--brand-dark)',
                marginBottom: '1rem',
              }}
            >
              Propiedades Destacadas
            </h2>
            <p style={{ color: 'var(--brand-slate)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Elegidas por su ubicación privilegiada, características y valor de inversión.
            </p>
            <div
              style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, var(--brand-gold), #a8882e)',
                margin: '1.5rem auto 0',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Grid */}
          {featuredProperties.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--brand-slate)' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>(Sin Propiedades)</p>
              <p>Próximamente más propiedades disponibles.</p>
            </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              id="ver-todas-btn"
              href="/properties"
              className="btn-outline-gold"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'transparent',
                color: 'var(--brand-dark)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.03em',
              }}
            >
              Ver todas las propiedades →
            </Link>
          </div>
        </div>
      </section>

      {/* Why us section */}
      <section
        style={{
          padding: '6rem 1.5rem',
          background: 'var(--brand-dark)',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, color: 'white', marginBottom: '1rem' }}
            >
              ¿Por qué elegirnos?
            </h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--brand-gold)', margin: '0 auto', borderRadius: '2px' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              { icon: '10+', title: '+10 Años', desc: 'De experiencia en el mercado inmobiliario de Entre Ríos.' },
              { icon: 'A', title: 'Asesoramiento', desc: 'Acompañamiento personalizado en cada etapa de la operación.' },
              { icon: 'L', title: 'Conocimiento local', desc: 'Expertos en Gualeguaychú y toda la provincia de Entre Ríos.' },
              { icon: 'S', title: 'Seguridad jurídica', desc: 'Documentación y escrituración con total respaldo legal.' },
            ].map((item) => (
              <div
                key={item.title}
                className="card-why-us"
                style={{
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(201, 168, 76, 0.2)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--brand-gold)', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
