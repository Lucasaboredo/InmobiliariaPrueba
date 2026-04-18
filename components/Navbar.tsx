'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled || menuOpen
          ? 'rgba(15, 25, 35, 0.97)'
          : 'rgba(15, 25, 35, 0.3)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.3)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
        }}
      >
        {/* Logo Text */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '0.05em' }}>
              ANDREA DURE
            </span>
            <span style={{ color: 'var(--brand-gold)', fontWeight: 600, fontSize: '0.9rem', marginLeft: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="hide-mobile-small">
              Inmobiliaria
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {[
            { href: '/', label: 'Inicio' },
            { href: '/properties', label: 'Propiedades' },
            { href: '/mapa', label: 'Mapa' },
            { href: '/contacto', label: 'Contacto' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav-link-variant"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  padding: '0.5rem 0',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* CTA Desktop */}
          <a
            href={`https://wa.me/543447497062?text=Hola%20Andrea,%20me%20gustaría%20consultar%20sobre%20sus%20propiedades`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-hover desktop-nav"
            style={{
              color: 'var(--brand-dark)',
              padding: '0.6rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            Consultar →
          </a>

          {/* Mobile hamburger */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mobile-nav-menu" style={{ background: 'rgba(15, 25, 35, 0.98)', padding: '1rem 1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { href: '/', label: 'Inicio' },
              { href: '/properties', label: 'Propiedades' },
              { href: '/mapa', label: 'Mapa' },
              { href: '/contacto', label: 'Contacto' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600, color: 'white', display: 'block' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`https://wa.me/543447497062?text=Hola%20Andrea,%20me%20gustaría%20consultar%20sobre%20sus%20propiedades`}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'inline-block', marginTop: '1rem', padding: '0.8rem 2rem', background: 'var(--brand-gold)', color: 'var(--brand-dark)', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}
              >
                Consultar por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        .mobile-menu-btn, .mobile-nav-menu { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn, .mobile-nav-menu { display: block; }
        }
        @media (max-width: 400px) {
          .hide-mobile-small { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
