// apps/frontend/src/app/[locale]/admin/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Button,
  H1,
  H2,
  H3,
  Body,
  Small,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Input,
  Modal,
  Sidebar,
} from '../../../../components/ui';

interface Category {
  id: string;
  slug: string;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
  active: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  translations?: Array<{
    id: string;
    categoryId: string;
    language: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<string>('categories');
  const [showAddModal, setShowAddModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      slug: 'eletronicos',
      parentId: null,
      parent: null,
      children: [
        {
          id: '4',
          slug: 'smartphones',
          parentId: '1',
          parent: null,
          children: [],
          active: true,
          displayOrder: 1,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          translations: [
            {
              id: 't4-pt',
              categoryId: '4',
              language: 'pt',
              name: 'Smartphones',
              description: 'Telefones inteligentes',
              createdAt: '2024-01-15',
              updatedAt: '2024-01-15',
            },
            {
              id: 't4-en',
              categoryId: '4',
              language: 'en',
              name: 'Smartphones',
              description: 'Smart phones',
              createdAt: '2024-01-15',
              updatedAt: '2024-01-15',
            },
          ],
        },
      ],
      active: true,
      displayOrder: 1,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      translations: [
        {
          id: 't1-pt',
          categoryId: '1',
          language: 'pt',
          name: 'Eletrônicos',
          description: 'Produtos eletrônicos e tecnologia',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
        },
        {
          id: 't1-en',
          categoryId: '1',
          language: 'en',
          name: 'Electronics',
          description: 'Electronic products and technology',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
        },
      ],
    },
    {
      id: '2',
      slug: 'casa-jardim',
      parentId: null,
      parent: null,
      children: [],
      active: true,
      displayOrder: 2,
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16',
      translations: [
        {
          id: 't2-pt',
          categoryId: '2',
          language: 'pt',
          name: 'Casa e Jardim',
          description: 'Produtos para casa e jardim',
          createdAt: '2024-01-16',
          updatedAt: '2024-01-16',
        },
        {
          id: 't2-en',
          categoryId: '2',
          language: 'en',
          name: 'Home & Garden',
          description: 'Home and garden products',
          createdAt: '2024-01-16',
          updatedAt: '2024-01-16',
        },
      ],
    },
    {
      id: '3',
      slug: 'moda',
      parentId: null,
      parent: null,
      children: [],
      active: false,
      displayOrder: 3,
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17',
      translations: [
        {
          id: 't3-pt',
          categoryId: '3',
          language: 'pt',
          name: 'Moda',
          description: 'Roupas e acessórios',
          createdAt: '2024-01-17',
          updatedAt: '2024-01-17',
        },
        {
          id: 't3-en',
          categoryId: '3',
          language: 'en',
          name: 'Fashion',
          description: 'Clothing and accessories',
          createdAt: '2024-01-17',
          updatedAt: '2024-01-17',
        },
      ],
    },
  ]);

  const [formData, setFormData] = useState({
    slug: '',
    parentId: null as string | null,
    displayOrder: 0,
    active: true,
    translations: [
      { language: 'pt', name: '', description: '' },
      { language: 'en', name: '', description: '' },
    ],
  });

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTranslationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map((trans, i) =>
        i === index ? { ...trans, [field]: value } : trans
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory: Category = {
      id: Date.now().toString(),
      slug: formData.slug,
      parentId: formData.parentId,
      parent: null,
      children: [],
      active: formData.active,
      displayOrder: formData.displayOrder,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      translations: formData.translations.map((trans, _index) => ({
        id: `t${Date.now()}-${trans.language}`,
        categoryId: Date.now().toString(),
        language: trans.language,
        name: trans.name,
        description: trans.description,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      })),
    };

    setCategories(prev => [...prev, newCategory]);
    setFormData({
      slug: '',
      parentId: null,
      displayOrder: 0,
      active: true,
      translations: [
        { language: 'pt', name: '', description: '' },
        { language: 'en', name: '', description: '' },
      ],
    });
    setShowAddModal(false);
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, active: !cat.active } : cat))
    );
  };

  // Sidebar menu items
  const sidebarItems = [
    {
      id: 'categories',
      label: 'Categorias',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
          />
        </svg>
      ),
      onClick: () => setActiveSection('categories'),
      active: activeSection === 'categories',
    },
  ];

  return (
    <div className='min-h-screen bg-neutral-bg-light flex'>
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-neutral-bg-card border-b border-neutral-border p-6'>
          <div className='flex justify-between items-center'>
            <div>
              <H1>Painel Administrativo</H1>
              <Body className='text-neutral-text-secondary'>
                Gerencie categorias e configurações do sistema
              </Body>
            </div>
            {activeSection === 'categories' && (
              <Button onClick={() => setShowAddModal(true)} variant='primary'>
                Adicionar Categoria
              </Button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className='flex-1 p-6'>
          {activeSection === 'categories' && (
            <Card>
              <CardHeader>
                <H2>Categorias Existentes</H2>
                <Small className='text-neutral-text-secondary'>
                  {categories.length} categorias cadastradas
                </Small>
              </CardHeader>
              <CardContent>
                <Stack spacing={3}>
                  {categories.map(category => (
                    <Card key={category.id} variant='outlined' padding='sm'>
                      <div className='flex justify-between items-start'>
                        <Stack spacing={2} className='flex-1'>
                          <div className='flex items-center space-x-3'>
                            <H3>
                              {category.translations?.[0]?.name ||
                                category.slug}
                            </H3>
                            <Badge
                              variant={category.active ? 'success' : 'default'}
                              size='sm'
                            >
                              {category.active ? 'Ativa' : 'Inativa'}
                            </Badge>
                            {category.parentId && (
                              <Badge variant='info' size='sm'>
                                Subcategoria
                              </Badge>
                            )}
                          </div>
                          <Body className='text-neutral-text-secondary'>
                            {category.translations?.[0]?.description ||
                              'Sem descrição'}
                          </Body>
                          <div className='flex items-center space-x-4 text-sm text-neutral-text-secondary'>
                            <span>Slug: {category.slug}</span>
                            <span>Ordem: {category.displayOrder}</span>
                            <span>Criado em: {category.createdAt}</span>
                            {category.parentId && (
                              <span>
                                Pai:{' '}
                                {category.parent?.translations?.[0]?.name ||
                                  'N/A'}
                              </span>
                            )}
                          </div>
                          {category.children &&
                            category.children.length > 0 && (
                              <div className='mt-2'>
                                <Small className='text-neutral-text-secondary mb-2 block'>
                                  Subcategorias:
                                </Small>
                                <div className='flex flex-wrap gap-2'>
                                  {category.children.map(child => (
                                    <Badge
                                      key={child.id}
                                      variant='info'
                                      size='sm'
                                    >
                                      {child.translations?.[0]?.name ||
                                        child.slug}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          {category.translations && (
                            <div className='flex flex-wrap gap-2'>
                              {category.translations.map((trans, index) => (
                                <Badge key={index} variant='info' size='sm'>
                                  {trans.language.toUpperCase()}: {trans.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </Stack>
                        <Stack direction='row' spacing={2}>
                          <Button
                            variant={category.active ? 'outline' : 'primary'}
                            size='sm'
                            onClick={() => toggleCategoryStatus(category.id)}
                          >
                            {category.active ? 'Desativar' : 'Ativar'}
                          </Button>
                          <Button variant='outline' size='sm'>
                            Editar
                          </Button>
                        </Stack>
                      </div>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title='Adicionar Nova Categoria'
        size='xl'
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Stack direction='row' spacing={4}>
              <Input
                label='Slug'
                placeholder='Ex: eletronicos'
                value={formData.slug}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('slug', e.target.value)
                }
                required
              />
              <div className='w-full'>
                <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
                  Categoria Pai
                </label>
                <select
                  value={formData.parentId || ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange('parentId', e.target.value || '')
                  }
                  className='flex h-10 w-full rounded-md border border-neutral-border bg-neutral-bg-card px-3 py-2 text-sm text-neutral-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent'
                >
                  <option value=''>Nenhuma (Categoria Principal)</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.translations?.[0]?.name || category.slug}
                    </option>
                  ))}
                </select>
              </div>
            </Stack>

            <Stack direction='row' spacing={4}>
              <Input
                label='Ordem de Exibição'
                type='number'
                value={formData.displayOrder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('displayOrder', parseInt(e.target.value))
                }
                required
              />
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='active'
                  checked={formData.active}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('active', e.target.checked)
                  }
                  className='rounded border-neutral-border'
                />
                <label
                  htmlFor='active'
                  className='text-sm font-medium text-neutral-text-primary'
                >
                  Categoria ativa
                </label>
              </div>
            </Stack>

            {/* Translations */}
            <div>
              <H3 className='mb-4'>Traduções</H3>
              <Stack spacing={4}>
                {formData.translations.map((trans, index) => (
                  <Card key={index} variant='outlined' padding='sm'>
                    <Stack spacing={3}>
                      <div className='flex items-center space-x-2'>
                        <Badge variant='info' size='sm'>
                          {trans.language.toUpperCase()}
                        </Badge>
                      </div>
                      <Stack direction='row' spacing={3}>
                        <Input
                          label='Nome'
                          placeholder={`Nome em ${trans.language === 'pt' ? 'Português' : 'English'}`}
                          value={trans.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleTranslationChange(
                              index,
                              'name',
                              e.target.value
                            )
                          }
                        />
                        <Input
                          label='Descrição'
                          placeholder={`Descrição em ${trans.language === 'pt' ? 'Português' : 'English'}`}
                          value={trans.description}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleTranslationChange(
                              index,
                              'description',
                              e.target.value
                            )
                          }
                        />
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </div>

            <Stack direction='row' spacing={3} className='pt-4'>
              <Button type='submit' variant='primary'>
                Criar Categoria
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Modal>
    </div>
  );
}
