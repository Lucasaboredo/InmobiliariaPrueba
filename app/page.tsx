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

      {/* Contact CTA */}
      <section
        id="contacto"
        style={{
          padding: '6rem 1.5rem',
          background: 'linear-gradient(135deg, var(--brand-navy), var(--brand-dark))',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'white', fontWeight: 700, marginBottom: '1rem' }}>
            ¿Listo para encontrar tu hogar?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            Contactanos hoy mismo y te asesoramos sin compromiso.
          </p>
          <a
            id="contacto-whatsapp-btn"
            href="https://wa.me/543447497062?text=Hola%20Andrea,%20me%20gustar%C3%ADa%20consultar%20sobre%20propiedades."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: '#25d366',
              color: 'white',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.05rem',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
