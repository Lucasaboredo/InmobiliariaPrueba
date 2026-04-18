import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    default: 'Inmobiliaria | Propiedades en Entre Ríos',
    template: '%s | Inmobiliaria',
  },
  description:
    'Encontrá tu hogar ideal en Gualeguaychú y Entre Ríos. Inmobiliaria — propiedades en venta y alquiler con asesoramiento personalizado.',
  keywords: ['inmobiliaria', 'Gualeguaychú', 'Entre Ríos', 'propiedades', 'casas en venta', 'departamentos'],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Inmobiliaria',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
        <footer
          style={{
            background: 'var(--brand-dark)',
            color: 'rgba(255,255,255,0.7)',
            padding: '3rem 2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <img src="/logo.png" alt="Inmobiliaria Logo" style={{ height: '70px', objectFit: 'contain' }} />
          </div>
          <p style={{ fontSize: '0.875rem' }}>Concepción del Uruguay, Entre Ríos, Argentina</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Tel: +54 3447 497062 &nbsp;|&nbsp; Email: contacto@inmobiliaria.com
          </p>
          <p style={{ fontSize: '0.75rem', marginTop: '1.5rem', opacity: 0.5 }}>
            © {new Date().getFullYear()} Inmobiliaria. Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}
