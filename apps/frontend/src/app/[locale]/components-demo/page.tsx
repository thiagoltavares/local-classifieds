// apps/frontend/src/app/[locale]/components-demo/page.tsx
'use client';

import { Button, H1, H2, H3, Body, Small } from '../../../components/ui';

export default function ComponentsDemo() {
  return (
    <div className='min-h-screen bg-neutral-bg-light'>
      <div className='container mx-auto px-4 py-8'>
        <H1 className='mb-8'>Componentes UI - Demonstração</H1>

        {/* Tipografia */}
        <section className='mb-12'>
          <H2 className='mb-6'>Tipografia</H2>
          <div className='space-y-4'>
            <H1>H1 - Título Principal</H1>
            <H2>H2 - Título Secundário</H2>
            <H3>H3 - Título Terciário</H3>
            <Body>
              Body - Este é um parágrafo de texto normal. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Body>
            <Small>
              Small - Este é um texto pequeno para legendas e informações
              secundárias.
            </Small>
          </div>
        </section>

        {/* Botões */}
        <section className='mb-12'>
          <H2 className='mb-6'>Botões</H2>
          <div className='space-y-6'>
            {/* Tamanhos */}
            <div>
              <H3 className='mb-4'>Tamanhos</H3>
              <div className='flex gap-4 items-center'>
                <Button size='sm'>Pequeno</Button>
                <Button size='md'>Médio</Button>
                <Button size='lg'>Grande</Button>
              </div>
            </div>

            {/* Variantes */}
            <div>
              <H3 className='mb-4'>Variantes</H3>
              <div className='flex gap-4 items-center'>
                <Button variant='primary'>Primário</Button>
                <Button variant='secondary'>Secundário</Button>
                <Button variant='outline'>Outline</Button>
              </div>
            </div>

            {/* Estados */}
            <div>
              <H3 className='mb-4'>Estados</H3>
              <div className='flex gap-4 items-center'>
                <Button>Normal</Button>
                <Button disabled>Desabilitado</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cores do tema */}
        <section className='mb-12'>
          <H2 className='mb-6'>Cores do Tema</H2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='bg-brand-primary text-white p-4 rounded-lg'>
              <Small>Brand Primary</Small>
            </div>
            <div className='bg-brand-secondary text-white p-4 rounded-lg'>
              <Small>Brand Secondary</Small>
            </div>
            <div className='bg-brand-accent text-white p-4 rounded-lg'>
              <Small>Brand Accent</Small>
            </div>
            <div className='bg-status-success text-white p-4 rounded-lg'>
              <Small>Status Success</Small>
            </div>
            <div className='bg-status-warning text-white p-4 rounded-lg'>
              <Small>Status Warning</Small>
            </div>
            <div className='bg-status-error text-white p-4 rounded-lg'>
              <Small>Status Error</Small>
            </div>
            <div className='bg-status-info text-white p-4 rounded-lg'>
              <Small>Status Info</Small>
            </div>
            <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg'>
              <Small>Neutral Card</Small>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
