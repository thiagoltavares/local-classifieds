// /Users/thiagotavares/Projects/Services/apps/api/src/categories/categories.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor() {}

  async create(createCategoryDto: Record<string, unknown>) {
    // Mock implementation for now
    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      slug: createCategoryDto.slug || 'test-category',
      displayOrder: createCategoryDto.displayOrder || 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      translations: createCategoryDto.translations || [],
    };
  }

  async findAll(_query: Record<string, unknown>) {
    // Mock implementation for now
    return {
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          slug: 'plumber',
          displayOrder: 10,
          active: true,
          translations: [
            {
              language: 'pt',
              name: 'Encanador',
              description: 'Serviços de hidráulica e encanamentos',
            },
            {
              language: 'en',
              name: 'Plumber',
              description: 'Plumbing and water services',
            },
          ],
        },
      ],
      pagination: {
        total: 1,
        limit: 20,
        offset: 0,
        hasMore: false,
      },
    };
  }

  async findOne(id: string) {
    // Mock implementation for now
    return {
      id,
      slug: 'plumber',
      displayOrder: 10,
      active: true,
      translations: [
        {
          language: 'pt',
          name: 'Encanador',
          description: 'Serviços de hidráulica e encanamentos',
        },
        {
          language: 'en',
          name: 'Plumber',
          description: 'Plumbing and water services',
        },
      ],
    };
  }

  async update(id: string, updateCategoryDto: Record<string, unknown>) {
    // Mock implementation for now
    return {
      id,
      ...updateCategoryDto,
      updatedAt: new Date(),
    };
  }

  async softDelete(id: string) {
    // Mock implementation for now
    return {
      message: 'Category soft deleted successfully',
      category: {
        id,
        active: false,
      },
    };
  }
}
