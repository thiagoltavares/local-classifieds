// apps/frontend/src/app/page.tsx
'use client';

import Link from 'next/link';
// import { useTranslations } from './providers/I18nProvider'; // TODO: Implement translations
import LanguageSwitcher from '../components/LanguageSwitcher';
import {
  Button,
  Card,
  CardContent,
  H1,
  H2,
  H3,
  Body,
  Input,
  Badge,
} from '../components/ui';

export default function Home() {
  // const { t } = useTranslations('common'); // TODO: Implement translations

  // Mock data for categories
  const categories = [
    { name: 'Encanador', icon: '🔧', slug: 'encanador' },
    { name: 'Pintor', icon: '🎨', slug: 'pintor' },
    { name: 'Jardineiro', icon: '🌱', slug: 'jardineiro' },
    { name: 'Eletricista', icon: '⚡', slug: 'eletricista' },
    { name: 'Limpeza', icon: '🧹', slug: 'limpeza' },
    { name: 'Mecânico', icon: '🔩', slug: 'mecanico' },
    { name: 'Pedreiro', icon: '🧱', slug: 'pedreiro' },
    { name: 'Designer', icon: '💻', slug: 'designer' },
  ];

  // Mock data for featured providers
  const featuredProviders = [
    {
      name: 'João Silva',
      category: 'Encanador',
      location: 'São Paulo, SP',
      rating: 4.9,
      slug: 'joao-silva-encanador',
    },
    {
      name: 'Maria Santos',
      category: 'Pintora',
      location: 'Rio de Janeiro, RJ',
      rating: 4.8,
      slug: 'maria-santos-pintora',
    },
    {
      name: 'Carlos Oliveira',
      category: 'Jardineiro',
      location: 'Belo Horizonte, MG',
      rating: 4.7,
      slug: 'carlos-oliveira-jardineiro',
    },
  ];

  // Mock testimonials
  const testimonials = [
    {
      text: 'Encontrei um excelente encanador em minutos! Serviço rápido e de qualidade.',
      author: 'Ana Costa',
      location: 'São Paulo, SP',
    },
    {
      text: 'Plataforma muito fácil de usar. Recomendo para todos os prestadores.',
      author: 'Pedro Lima',
      location: 'Rio de Janeiro, RJ',
    },
    {
      text: 'Economizei tempo e dinheiro encontrando o serviço certo na primeira tentativa.',
      author: 'Lucia Ferreira',
      location: 'Belo Horizonte, MG',
    },
  ];

  return (
    <div className='min-h-screen bg-neutral-bg-light'>
      {/* Header */}
      <header className='bg-white border-b border-neutral-border shadow-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='text-xl font-bold text-brand-primary'>
              LocalClassifieds
            </Link>

            <nav className='hidden md:flex items-center gap-6'>
              <Link
                href='/'
                className='text-neutral-text-primary hover:text-brand-primary'
              >
                Início
              </Link>
              <Link
                href='/categorias'
                className='text-neutral-text-primary hover:text-brand-primary'
              >
                Categorias
              </Link>
              <Link
                href='/prestadores'
                className='text-neutral-text-primary hover:text-brand-primary'
              >
                Para Prestadores
              </Link>
              <Link
                href='/contato'
                className='text-neutral-text-primary hover:text-brand-primary'
              >
                Contato
              </Link>
            </nav>

            <div className='flex items-center gap-3'>
              <LanguageSwitcher />
              <Link href='/admin'>
                <Button variant='outline' size='sm'>
                  Admin
                </Button>
              </Link>
              <Button variant='outline' size='sm'>
                Entrar
              </Button>
              <Button variant='primary' size='sm'>
                Cadastrar-se
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-16'>
        <div className='container mx-auto px-4 text-center'>
          <H1 className='text-4xl md:text-6xl font-bold mb-6'>
            Encontre prestadores de serviços locais confiáveis
          </H1>
          <Body className='text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
            Conectamos você com os melhores profissionais da sua região.
            Serviços de qualidade, preços justos e avaliações reais.
          </Body>

          <div className='max-w-2xl mx-auto mb-8'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <Input
                  placeholder='Que serviço você precisa?'
                  className='w-full'
                />
              </div>
              <div className='flex-1'>
                <Input placeholder='Sua cidade ou bairro' className='w-full' />
              </div>
              <Button variant='secondary' size='lg' className='px-8'>
                Buscar
              </Button>
            </div>
          </div>

          <div className='flex flex-wrap justify-center gap-2'>
            {categories.slice(0, 4).map(category => (
              <Link key={category.slug} href={`/categorias/${category.slug}`}>
                <Badge
                  variant='default'
                  className='cursor-pointer hover:bg-white/20'
                >
                  {category.icon} {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <H2 className='text-center mb-12'>Categorias em Destaque</H2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {categories.map(category => (
              <Link key={category.slug} href={`/categorias/${category.slug}`}>
                <Card className='hover:shadow-lg transition-shadow cursor-pointer text-center'>
                  <CardContent className='p-6'>
                    <div className='text-4xl mb-3'>{category.icon}</div>
                    <H3 className='text-lg'>{category.name}</H3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <H2 className='text-center mb-12'>Como Funciona</H2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4'>
                1
              </div>
              <H3 className='mb-2'>Buscar</H3>
              <Body className='text-neutral-text-secondary'>
                Digite o serviço que precisa e sua localização
              </Body>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4'>
                2
              </div>
              <H3 className='mb-2'>Escolher</H3>
              <Body className='text-neutral-text-secondary'>
                Compare perfis, preços e avaliações dos prestadores
              </Body>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4'>
                3
              </div>
              <H3 className='mb-2'>Contatar</H3>
              <Body className='text-neutral-text-secondary'>
                Entre em contato diretamente e feche o serviço
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <H2 className='text-center mb-12'>Prestadores em Destaque</H2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {featuredProviders.map(provider => (
              <Link key={provider.slug} href={`/prestadores/${provider.slug}`}>
                <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center'>
                        {provider.name.charAt(0)}
                      </div>
                      <div>
                        <H3 className='text-lg'>{provider.name}</H3>
                        <Body className='text-neutral-text-secondary'>
                          {provider.category}
                        </Body>
                      </div>
                    </div>
                    <Body className='text-neutral-text-secondary mb-2'>
                      {provider.location}
                    </Body>
                    <div className='flex items-center gap-1 mb-4'>
                      <span className='text-yellow-500'>⭐</span>
                      <Body className='text-sm'>{provider.rating}</Body>
                    </div>
                    <Button variant='outline' className='w-full'>
                      Ver Perfil
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Providers */}
      <section className='py-16 bg-brand-primary text-white'>
        <div className='container mx-auto px-4 text-center'>
          <H2 className='mb-4'>É prestador de serviços?</H2>
          <Body className='text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
            Cadastre-se gratuitamente e comece a receber clientes hoje mesmo.
            Aumente sua visibilidade e cresça seu negócio.
          </Body>
          <Link href='/cadastro-prestador'>
            <Button variant='secondary' size='lg' className='px-8'>
              Cadastre-se Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <H2 className='text-center mb-12'>O que nossos usuários dizem</H2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className='p-6'>
                  <blockquote className='mb-4'>
                    <Body className='italic'>"{testimonial.text}"</Body>
                  </blockquote>
                  <div>
                    <Body className='font-semibold'>{testimonial.author}</Body>
                    <Body className='text-neutral-text-secondary text-sm'>
                      {testimonial.location}
                    </Body>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-neutral-text-primary text-white py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <H3 className='mb-4'>LocalClassifieds</H3>
              <Body className='text-neutral-300'>
                Conectando clientes e prestadores de serviços locais.
              </Body>
            </div>
            <div>
              <H3 className='mb-4'>Links Úteis</H3>
              <div className='space-y-2'>
                <Link
                  href='/sobre'
                  className='block text-neutral-300 hover:text-white'
                >
                  Sobre Nós
                </Link>
                <Link
                  href='/termos'
                  className='block text-neutral-300 hover:text-white'
                >
                  Termos de Uso
                </Link>
                <Link
                  href='/privacidade'
                  className='block text-neutral-300 hover:text-white'
                >
                  Política de Privacidade
                </Link>
              </div>
            </div>
            <div>
              <H3 className='mb-4'>Para Prestadores</H3>
              <div className='space-y-2'>
                <Link
                  href='/cadastro-prestador'
                  className='block text-neutral-300 hover:text-white'
                >
                  Cadastre-se
                </Link>
                <Link
                  href='/como-funciona'
                  className='block text-neutral-300 hover:text-white'
                >
                  Como Funciona
                </Link>
                <Link
                  href='/suporte'
                  className='block text-neutral-300 hover:text-white'
                >
                  Suporte
                </Link>
              </div>
            </div>
            <div>
              <H3 className='mb-4'>Contato</H3>
              <div className='space-y-2'>
                <Body className='text-neutral-300'>
                  contato@localclassifieds.com
                </Body>
                <Body className='text-neutral-300'>(11) 99999-9999</Body>
                <div className='flex gap-3 mt-4'>
                  <Link href='#' className='text-neutral-300 hover:text-white'>
                    Facebook
                  </Link>
                  <Link href='#' className='text-neutral-300 hover:text-white'>
                    Instagram
                  </Link>
                  <Link href='#' className='text-neutral-300 hover:text-white'>
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='border-t border-neutral-600 mt-8 pt-8 text-center'>
            <Body className='text-neutral-300'>
              © 2024 LocalClassifieds. Todos os direitos reservados.
            </Body>
          </div>
        </div>
      </footer>
    </div>
  );
}
