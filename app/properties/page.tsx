'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import { Property, PropertyStatus, PropertyType } from '@/types/property';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [page, setPage] = useState(1);

  const fetchProperties = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    if (maxPrice) params.set('maxPrice', maxPrice);
    params.set('page', page.toString());
    params.set('limit', '12');

    try {
      const res = await fetch(`${API_URL}/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.data || []);
      setTotal(data.meta?.total || 0);
      setTotalPages(data.meta?.totalPages || 1);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page, type, status, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProperties();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--brand-cream)' }}>
      {/* Page header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--brand-dark), var(--brand-navy))',
          padding: '8rem 1.5rem 4rem',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
          Catálogo completo
        </p>
        <h1
          className="font-display"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}
        >
          Propiedades Disponibles
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
          {total > 0 ? `${total} propiedades encontradas` : 'Buscando...'}
        </p>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'sticky', top: '72px', zIndex: 50 }}>
        <form onSubmit={handleSearch} style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            id="properties-search-input"
            type="text"
            placeholder="Buscar por ciudad, barrio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: '1 1 220px', padding: '0.6rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--brand-gold)')}
            onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          />
          <select id="filter-type" value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} style={{ padding: '0.6rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit', background: 'white', cursor: 'pointer', outline: 'none' }}>
            <option value="">Todos los tipos</option>
            <option value="house">Casa</option>
            <option value="apartment">Departamento</option>
            <option value="land">Terreno</option>
            <option value="commercial">Local Comercial</option>
            <option value="office">Oficina</option>
          </select>
          <select id="filter-status" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={{ padding: '0.6rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit', background: 'white', cursor: 'pointer', outline: 'none' }}>
            <option value="">Todos los estados</option>
            <option value="for_sale">En Venta</option>
            <option value="rented">Alquilada</option>
            <option value="sold">Vendida</option>
          </select>
          <select id="filter-price" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }} style={{ padding: '0.6rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit', background: 'white', cursor: 'pointer', outline: 'none' }}>
            <option value="">Precio: todos</option>
            <option value="50000">Hasta USD 50.000</option>
            <option value="100000">Hasta USD 100.000</option>
            <option value="150000">Hasta USD 150.000</option>
            <option value="200000">Hasta USD 200.000</option>
            <option value="300000">Hasta USD 300.000</option>
          </select>
          <button type="submit" id="apply-filters-btn" style={{ padding: '0.65rem 1.5rem', background: 'var(--brand-gold)', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', color: 'var(--brand-dark)' }}>
            Buscar
          </button>
        </form>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ height: '380px', background: '#e5e7eb', borderRadius: '16px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
              {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '3rem' }}>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '8px',
                      border: page === i + 1 ? '2px solid var(--brand-gold)' : '2px solid #e5e7eb',
                      background: page === i + 1 ? 'var(--brand-gold)' : 'white',
                      color: page === i + 1 ? 'var(--brand-dark)' : 'var(--brand-slate)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>(Sin Resultados)</p>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>No encontramos propiedades</h3>
            <p style={{ color: 'var(--brand-slate)' }}>Probá con otros filtros o contactanos directamente.</p>
          </div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.5} }`}</style>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
