// apps/frontend/src/app/[locale]/color-test/page.tsx
'use client';

export default function ColorTest() {
  return (
    <div className='min-h-screen bg-neutral-bg-light p-8'>
      <h1 className='text-3xl font-bold text-neutral-text-primary mb-8'>
        Teste de Cores Personalizadas
      </h1>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        {/* Brand Colors */}
        <div className='bg-brand-primary text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Brand Primary</p>
          <p className='text-sm opacity-90'>#2563EB</p>
        </div>

        <div className='bg-brand-primary-dark text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Brand Primary Dark</p>
          <p className='text-sm opacity-90'>#1E40AF</p>
        </div>

        <div className='bg-brand-secondary text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Brand Secondary</p>
          <p className='text-sm opacity-90'>#F59E0B</p>
        </div>

        <div className='bg-brand-accent text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Brand Accent</p>
          <p className='text-sm opacity-90'>#0D9488</p>
        </div>

        {/* Status Colors */}
        <div className='bg-status-success text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Status Success</p>
          <p className='text-sm opacity-90'>#10B981</p>
        </div>

        <div className='bg-status-warning text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Status Warning</p>
          <p className='text-sm opacity-90'>#FBBF24</p>
        </div>

        <div className='bg-status-error text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Status Error</p>
          <p className='text-sm opacity-90'>#EF4444</p>
        </div>

        <div className='bg-status-info text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Status Info</p>
          <p className='text-sm opacity-90'>#3B82F6</p>
        </div>
      </div>

      {/* Neutral Colors */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center'>
          <p className='font-semibold text-neutral-text-primary'>
            Neutral Card
          </p>
          <p className='text-sm text-neutral-text-secondary'>#FFFFFF</p>
        </div>

        <div className='bg-neutral-text-primary text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Neutral Text Primary</p>
          <p className='text-sm opacity-90'>#111827</p>
        </div>

        <div className='bg-neutral-text-secondary text-white p-4 rounded-lg text-center'>
          <p className='font-semibold'>Neutral Text Secondary</p>
          <p className='text-sm opacity-90'>#6B7280</p>
        </div>
      </div>

      {/* Dark Colors */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='bg-dark-bg text-dark-text-primary p-4 rounded-lg text-center'>
          <p className='font-semibold'>Dark BG</p>
          <p className='text-sm text-dark-text-secondary'>#111827</p>
        </div>

        <div className='bg-dark-bg-card text-dark-text-primary p-4 rounded-lg text-center'>
          <p className='font-semibold'>Dark BG Card</p>
          <p className='text-sm text-dark-text-secondary'>#1F2937</p>
        </div>

        <div className='bg-neutral-border text-neutral-text-primary p-4 rounded-lg text-center'>
          <p className='font-semibold'>Neutral Border</p>
          <p className='text-sm text-neutral-text-secondary'>#E5E7EB</p>
        </div>
      </div>
    </div>
  );
}
