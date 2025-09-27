// apps/frontend/src/app/[locale]/components-demo/page.tsx
'use client';

import {
  Button,
  H1,
  H2,
  H3,
  Body,
  Small,
  Stack,
  Divider,
} from '../../../components/ui';

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

        {/* Stack Component */}
        <section className='mb-12'>
          <H2 className='mb-6'>Stack Component</H2>
          <div className='space-y-8'>
            {/* Stack Vertical */}
            <div>
              <H3 className='mb-4'>Stack Vertical (padrão)</H3>
              <Stack spacing={2}>
                <div className='bg-brand-primary text-white p-4 rounded-lg text-center'>
                  Item 1
                </div>
                <div className='bg-brand-secondary text-white p-4 rounded-lg text-center'>
                  Item 2
                </div>
                <div className='bg-brand-accent text-white p-4 rounded-lg text-center'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack Horizontal */}
            <div>
              <H3 className='mb-4'>Stack Horizontal</H3>
              <Stack direction='row' spacing={2}>
                <div className='bg-brand-primary text-white p-4 rounded-lg text-center flex-1'>
                  Item 1
                </div>
                <div className='bg-brand-secondary text-white p-4 rounded-lg text-center flex-1'>
                  Item 2
                </div>
                <div className='bg-brand-accent text-white p-4 rounded-lg text-center flex-1'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack com Divider */}
            <div>
              <H3 className='mb-4'>Stack com Divider</H3>
              <Stack
                direction='row'
                divider={<Divider orientation='vertical' flexItem />}
                spacing={2}
              >
                <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center flex-1'>
                  Item 1
                </div>
                <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center flex-1'>
                  Item 2
                </div>
                <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center flex-1'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack Responsivo */}
            <div>
              <H3 className='mb-4'>Stack Responsivo</H3>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                className='flex-wrap'
              >
                <div className='bg-status-success text-white p-4 rounded-lg text-center flex-1 min-w-0'>
                  Item 1
                </div>
                <div className='bg-status-warning text-white p-4 rounded-lg text-center flex-1 min-w-0'>
                  Item 2
                </div>
                <div className='bg-status-info text-white p-4 rounded-lg text-center flex-1 min-w-0'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack com Alinhamento */}
            <div>
              <H3 className='mb-4'>Stack com Alinhamento</H3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Small className='block mb-2'>alignItems: center</Small>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    className='h-20 bg-neutral-bg-card border border-neutral-border rounded-lg p-2'
                  >
                    <div className='bg-brand-primary text-white p-2 rounded text-sm'>
                      Item 1
                    </div>
                    <div className='bg-brand-secondary text-white p-2 rounded text-sm'>
                      Item 2
                    </div>
                    <div className='bg-brand-accent text-white p-2 rounded text-sm'>
                      Item 3
                    </div>
                  </Stack>
                </div>
                <div>
                  <Small className='block mb-2'>
                    justifyContent: space-between
                  </Small>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={2}
                    className='h-20 bg-neutral-bg-card border border-neutral-border rounded-lg p-2'
                  >
                    <div className='bg-brand-primary text-white p-2 rounded text-sm'>
                      Item 1
                    </div>
                    <div className='bg-brand-secondary text-white p-2 rounded text-sm'>
                      Item 2
                    </div>
                    <div className='bg-brand-accent text-white p-2 rounded text-sm'>
                      Item 3
                    </div>
                  </Stack>
                </div>
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
