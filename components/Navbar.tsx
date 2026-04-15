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
        background: scrolled
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
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div>
            <img src="/logo.png" alt="Inmobiliaria Logo" style={{ height: '60px', objectFit: 'contain' }} />
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
            { href: '#contacto', label: 'Contacto' },
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

        {/* CTA */}
        <a
          href={`https://wa.me/543447497062?text=Hola%20Andrea,%20me%20gustaría%20consultar%20sobre%20sus%20propiedades`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-hover"
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
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
