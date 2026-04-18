import React from 'react';

export default function ContactoPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', color: 'var(--brand-dark)' }}>
      {/* Header Banner */}
      <section style={{ background: 'var(--brand-dark)', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--brand-red, #dc2626)', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
          Asesoramiento Personalizado
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
          Hablemos de tu<br/><span style={{ color: 'var(--brand-red, #dc2626)' }}>Próximo Proyecto</span>
        </h1>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', width: '100%' }}>
        
        {/* Info Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Visítanos</h3>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.6 }}>
              Concepción del Uruguay<br />
              Entre Ríos, Argentina
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Llámanos</h3>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.6 }}>
              +54 3447 497062<br />
              Lunes a Viernes de 9:00 a 18:00
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Escríbenos</h3>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.6 }}>
              contacto@andreadure.com<br />
              Te responderemos a la brevedad.
            </p>
          </div>
        </div>

        {/* WhatsApp Block */}
        <div style={{ backgroundColor: '#f9fafb', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--brand-dark)' }}>Atención Inmediata</h2>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            ¿Tienes dudas sobre una propiedad o requieres una tasación? La manera más rápida de comunicarte con nosotros es mediante WhatsApp.
          </p>
          <a
            href="https://wa.me/543447497062?text=Hola%20Andrea,%20me%20gustaría%20consultar%20sobre%20propiedades."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: 'var(--brand-red, #dc2626)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'transform 0.2sease, box-shadow 0.2s ease',
              boxShadow: '0 10px 20px -10px rgba(220, 38, 38, 0.6)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 25px -10px rgba(220, 38, 38, 0.7)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(220, 38, 38, 0.6)'; }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactar vía WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
