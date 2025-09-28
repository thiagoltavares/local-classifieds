// apps/frontend/src/app/[locale]/(admin)/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Autocomplete,
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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from '../../../../components/ui';
import {
  useCategoriesPaginated,
  useCategories,
  useCategoryStats,
  useCreateCategory,
  type Category,
} from '../../../../services';
import { Spinner } from '../../../../components/ui/Spinner';
import { useToastNotifications } from '../../../../components/ui/Toast';
import type { AutocompleteOption } from '../../../../components/ui/Autocomplete';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<string>('categories');
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Hooks para buscar dados reais da API
  const {
    data: paginatedData,
    isLoading,
    error,
    refetch,
  } = useCategoriesPaginated(page, limit, {
    includeInactive: true, // Incluir inativas no admin
    includeChildren: false,
  });

  const { data: stats } = useCategoryStats();

  // Hook para buscar todas as categorias (sem paginação) para o Autocomplete
  const { data: allCategories = [] } = useCategories({
    includeInactive: false, // Só categorias ativas para o Autocomplete
    includeChildren: false,
  });

  // Hook para criar categoria
  const createCategoryMutation = useCreateCategory();

  // Hook para notificações
  const { showSuccess, showError } = useToastNotifications();

  const categories = paginatedData?.data || [];
  const pagination = paginatedData?.pagination;

  // Converter categorias para opções do autocomplete
  const parentCategoryOptions: AutocompleteOption[] = [
    {
      value: '',
      label: 'Nenhuma (Categoria Principal)',
      description: 'Criar como categoria raiz',
    },
    ...allCategories.map((category: Category) => ({
      value: category.id,
      label: category.translations?.[0]?.name || category.slug,
      description:
        category.translations?.[0]?.description || `Slug: ${category.slug}`,
    })),
  ];

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

  const validateForm = (): boolean => {
    if (!formData.slug.trim()) {
      showError('Slug é obrigatório', 'Validação');
      return false;
    }

    // Verificar se slug já existe
    const slugExists = allCategories.some(
      cat => cat.slug === formData.slug.trim()
    );
    if (slugExists) {
      showError('Este slug já existe. Escolha outro.', 'Validação');
      return false;
    }

    const validTranslations = formData.translations.filter(
      t => t.name.trim() !== ''
    );
    if (validTranslations.length === 0) {
      showError('Pelo menos uma tradução com nome é obrigatória', 'Validação');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Preparar dados para envio
      const createData = {
        slug: formData.slug.trim(),
        parentId: formData.parentId || null,
        displayOrder: formData.displayOrder,
        translations: formData.translations.filter(t => t.name.trim() !== ''), // Só enviar traduções com nome
      };

      // Criar categoria usando a mutação
      await createCategoryMutation.mutateAsync(createData);

      // Mostrar toast de sucesso
      showSuccess('Categoria criada com sucesso!', 'Sucesso');

      // Limpar formulário
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao criar categoria:', error);

      // Mostrar toast de erro
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao criar categoria';
      showError(errorMessage, 'Erro');
    }
  };

  const toggleCategoryStatus = (_id: string) => {
    // TODO: Implementar chamada para API para toggle de status
    // Por enquanto, apenas recarregar os dados
    void refetch();
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
            <>
              {/* Estatísticas */}
              {stats && (
                <Card className='mb-6'>
                  <CardHeader>
                    <H3>Estatísticas</H3>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {stats.total}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Total
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-green-600'>
                          {stats.active}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Ativas
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-red-600'>
                          {stats.inactive}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Inativas
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-purple-600'>
                          {stats.withChildren}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Com Filhos
                        </Small>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lista de Categorias */}
              <Card>
                <CardHeader>
                  <div className='flex justify-between items-center'>
                    <div>
                      <H2>Categorias</H2>
                      <Small className='text-neutral-text-secondary'>
                        {isLoading
                          ? 'Carregando...'
                          : `${categories.length} de ${pagination?.total || 0} categorias`}
                      </Small>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => void refetch()}
                    >
                      Atualizar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Spinner size='lg' />
                      <span className='ml-2'>Carregando categorias...</span>
                    </div>
                  ) : error ? (
                    <div className='text-center py-8'>
                      <H3 className='text-red-600 mb-2'>
                        Erro ao carregar categorias
                      </H3>
                      <Body className='text-neutral-text-secondary mb-4'>
                        {error.message}
                      </Body>
                      <Button onClick={() => void refetch()}>
                        Tentar novamente
                      </Button>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ordem</TableHead>
                          <TableHead>Criado em</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.length === 0 ? (
                          <TableEmpty
                            colSpan={6}
                            message='Nenhuma categoria encontrada'
                          />
                        ) : (
                          categories.map((category: Category) => (
                            <TableRow key={category.id}>
                              <TableCell>
                                <div>
                                  <div className='font-medium'>
                                    {category.translations?.[0]?.name ||
                                      category.slug}
                                  </div>
                                  {category.translations?.[0]?.description && (
                                    <div className='text-sm text-neutral-500'>
                                      {category.translations[0].description}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <code className='text-sm bg-neutral-100 px-2 py-1 rounded'>
                                  {category.slug}
                                </code>
                              </TableCell>
                              <TableCell>
                                <div className='flex items-center gap-2'>
                                  <Badge
                                    variant={
                                      category.active ? 'success' : 'default'
                                    }
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
                              </TableCell>
                              <TableCell>
                                <span className='text-sm text-neutral-600'>
                                  {category.displayOrder}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className='text-sm text-neutral-600'>
                                  {new Date(
                                    category.createdAt
                                  ).toLocaleDateString('pt-BR')}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className='flex items-center gap-2'>
                                  <Button
                                    variant={
                                      category.active ? 'outline' : 'primary'
                                    }
                                    size='sm'
                                    onClick={() =>
                                      toggleCategoryStatus(category.id)
                                    }
                                  >
                                    {category.active ? 'Desativar' : 'Ativar'}
                                  </Button>
                                  <Button variant='outline' size='sm'>
                                    Editar
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  )}

                  {/* Paginação */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className='mt-6 pt-4 border-t border-neutral-border'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPage(page - 1)}
                            disabled={!pagination.hasPrev}
                          >
                            Anterior
                          </Button>
                          <Small className='text-neutral-text-secondary'>
                            Página {pagination.page} de {pagination.totalPages}
                          </Small>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPage(page + 1)}
                            disabled={!pagination.hasNext}
                          >
                            Próxima
                          </Button>
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Mostrando {categories.length} de {pagination.total}{' '}
                          categorias
                        </Small>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
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
        <form onSubmit={e => void handleSubmit(e)}>
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
                <Autocomplete
                  options={parentCategoryOptions}
                  value={formData.parentId || ''}
                  onChange={value => handleInputChange('parentId', value || '')}
                  placeholder='Buscar categoria pai...'
                  emptyMessage='Nenhuma categoria encontrada'
                  searchable={true}
                />
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
              <Button
                type='submit'
                variant='primary'
                disabled={createCategoryMutation.isPending}
              >
                {createCategoryMutation.isPending ? (
                  <>
                    <Spinner size='sm' />
                    <span className='ml-2'>Criando...</span>
                  </>
                ) : (
                  'Criar Categoria'
                )}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => setShowAddModal(false)}
                disabled={createCategoryMutation.isPending}
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
