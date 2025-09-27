// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/categories.service.ts

import { Injectable } from '@nestjs/common';
import { CategoryService } from '@services/database';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryService: CategoryService) {}

  create(createCategoryDto: Record<string, unknown>) {
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

  async findAll(query: Record<string, unknown>, lang?: string) {
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;

    const categories = await this.categoryService.findAll({
      includeChildren: false,
      includeInactive: false,
      limit,
      offset,
    });

    // Filter translations by language if specified
    const filteredCategories = lang
      ? categories.map((category) => ({
          ...category,
          translations:
            category.translations?.filter((t) => t.language === lang) || [],
        }))
      : categories;

    return {
      categories: filteredCategories,
      pagination: {
        total: filteredCategories.length,
        limit,
        offset,
        hasMore: filteredCategories.length === limit,
      },
    };
  }

  async findOne(id: string, lang?: string) {
    const category = await this.categoryService.findById(id, {
      includeChildren: false,
      includeInactive: false,
    });

    if (!category) {
      return null;
    }

    // Filter translations by language if specified
    const filteredCategory = lang
      ? {
          ...category,
          translations:
            category.translations?.filter((t) => t.language === lang) || [],
        }
      : category;

    return filteredCategory;
  }

  update(id: string, updateCategoryDto: Record<string, unknown>) {
    // Mock implementation for now
    return {
      id,
      ...updateCategoryDto,
      updatedAt: new Date(),
    };
  }

  softDelete(id: string) {
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
