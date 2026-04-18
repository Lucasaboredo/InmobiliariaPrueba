'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    if (maxPrice) params.set('maxPrice', maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, var(--brand-dark), var(--brand-navy))',
        }}
      />
      {/* Overlay */}
      <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <img 
          src="/logo.png" 
          alt="Inmobiliaria Logo" 
          style={{ 
            height: '140px', 
            objectFit: 'contain', 
            margin: '0 auto 2.5rem',
            opacity: 0,
            animation: 'fadeInUp 0.6s ease 0.2s forwards'
          }} 
        />

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            opacity: 0,
            animation: 'fadeInUp 0.7s ease 0.4s forwards',
          }}
        >
          Tu hogar ideal,{' '}
          <span style={{ color: 'var(--brand-gold)' }}>te espera</span>
        </h1>

        <p
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '3rem',
            maxWidth: '580px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
            opacity: 0,
            animation: 'fadeInUp 0.7s ease 0.6s forwards',
          }}
        >
          Encontrá la propiedad perfecta con el respaldo de profesionales con más de 10 años de experiencia.
        </p>

        {/* Search card */}
        <form
          onSubmit={handleSearch}
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr auto',
            gap: '1rem',
            alignItems: 'end',
            boxShadow: '0 32px 64px rgba(0,0,0,0.35)',
            opacity: 0,
            animation: 'fadeInUp 0.7s ease 0.8s forwards',
          }}
          className="hero-search-form"
        >
          {/* Location search */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-slate)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Buscar
            </label>
            <input
              id="hero-search-input"
              type="text"
              placeholder="Ciudad, barrio o dirección..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-brand-focus"
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'var(--brand-dark)',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-slate)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Tipo
            </label>
            <select
              id="hero-type-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-brand-focus"
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: type ? 'var(--brand-dark)' : '#9ca3af',
                background: 'white',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <option value="">Todos los tipos</option>
              <option value="house">Casa</option>
              <option value="apartment">Departamento</option>
              <option value="land">Terreno</option>
              <option value="commercial">Local Comercial</option>
              <option value="office">Oficina</option>
            </select>
          </div>

          {/* Max price */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-slate)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Precio máx.
            </label>
            <select
              id="hero-price-select"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input-brand-focus"
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: maxPrice ? 'var(--brand-dark)' : '#9ca3af',
                background: 'white',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <option value="">Sin límite</option>
              <option value="50000">USD 50.000</option>
              <option value="100000">USD 100.000</option>
              <option value="150000">USD 150.000</option>
              <option value="200000">USD 200.000</option>
              <option value="300000">USD 300.000</option>
            </select>
          </div>

          {/* Button */}
          <button
            id="hero-search-btn"
            type="submit"
            className="btn-gold-hover"
            style={{
              padding: '0.75rem 2rem',
              color: 'var(--brand-dark)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            Buscar
          </button>
        </form>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            marginTop: '2.5rem',
            opacity: 0,
            animation: 'fadeInUp 0.7s ease 1s forwards',
          }}
          className="hero-stats"
        >
          {[
            { value: '+200', label: 'Propiedades' },
            { value: '+10', label: 'Años de experiencia' },
            { value: '+500', label: 'Clientes satisfechos' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-gold)', margin: 0 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: '2px 0 0', letterSpacing: '0.05em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-search-form { grid-template-columns: 1fr !important; }
          .hero-stats { gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
