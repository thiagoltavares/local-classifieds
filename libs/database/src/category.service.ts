// /Users/thiagotavares/Projects/Services/libs/database/src/category.service.ts

import { PrismaClient } from '@prisma/client';
import type { Category } from '../dist/generated/client';
import {
  CategoryWithChildren,
  CategoryHierarchyValidation,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryQueryOptions,
} from './types';

export class CategoryService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Create a new category
   */
  async create(data: CreateCategoryData): Promise<Category> {
    // Validate hierarchy before creating
    if (data.parentId) {
      const validation = await this.validateHierarchy(data.parentId, null);
      if (!validation.isValid) {
        throw new Error(`Invalid hierarchy: ${validation.error}`);
      }
    }

    // Check if slug already exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existingCategory) {
      throw new Error(`Category with slug '${data.slug}' already exists`);
    }

    return this.prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        parentId: data.parentId,
        displayOrder: data.displayOrder || 0,
      },
    });
  }

  /**
   * Find category by ID
   */
  async findById(
    id: string,
    options: CategoryQueryOptions = {}
  ): Promise<CategoryWithChildren | null> {
    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<
          { displayOrder: 'asc' | 'desc' } | { name: 'asc' | 'desc' }
        >;
      };
    } = {};

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      };
    }

    return this.prisma.category.findUnique({
      where: { id },
      include,
    });
  }

  /**
   * Find category by slug
   */
  async findBySlug(
    slug: string,
    options: CategoryQueryOptions = {}
  ): Promise<CategoryWithChildren | null> {
    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<
          { displayOrder: 'asc' | 'desc' } | { name: 'asc' | 'desc' }
        >;
      };
    } = {};

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      };
    }

    return this.prisma.category.findUnique({
      where: { slug },
      include,
    });
  }

  /**
   * Find all categories with optional filtering
   */
  async findAll(
    options: CategoryQueryOptions = {}
  ): Promise<CategoryWithChildren[]> {
    const where: {
      active?: boolean;
      parentId?: string | null;
    } = {};

    if (!options.includeInactive) {
      where.active = true;
    }

    if (options.parentId !== undefined) {
      where.parentId = options.parentId;
    }

    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<
          { displayOrder: 'asc' | 'desc' } | { name: 'asc' | 'desc' }
        >;
      };
    } = {};

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      };
    }

    return this.prisma.category.findMany({
      where,
      include,
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      take: options.limit,
      skip: options.offset,
    });
  }

  /**
   * Update category
   */
  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    // Validate hierarchy if parentId is being changed
    if (data.parentId !== undefined) {
      const validation = await this.validateHierarchy(data.parentId, id);
      if (!validation.isValid) {
        throw new Error(`Invalid hierarchy: ${validation.error}`);
      }
    }

    // Check if slug already exists (excluding current category)
    if (data.slug) {
      const existingCategory = await this.prisma.category.findFirst({
        where: {
          slug: data.slug,
          id: { not: id },
        },
      });

      if (existingCategory) {
        throw new Error(`Category with slug '${data.slug}' already exists`);
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Soft delete category (set active = false)
   */
  async softDelete(id: string): Promise<Category> {
    // Check if category has active children
    const childrenCount = await this.prisma.category.count({
      where: {
        parentId: id,
        active: true,
      },
    });

    if (childrenCount > 0) {
      throw new Error(
        'Cannot delete category with active children. Please deactivate children first.'
      );
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        active: false,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Restore category (set active = true)
   */
  async restore(id: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        active: true,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Get category hierarchy tree
   */
  async getHierarchyTree(
    includeInactive = false
  ): Promise<CategoryWithChildren[]> {
    const where = includeInactive ? {} : { active: true };

    const categories = await this.prisma.category.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });

    return this.buildHierarchyTree(categories);
  }

  /**
   * Validate category hierarchy to prevent cycles
   */
  async validateHierarchy(
    parentId: string | null,
    excludeId: string | null
  ): Promise<CategoryHierarchyValidation> {
    if (!parentId) {
      return { isValid: true };
    }

    if (parentId === excludeId) {
      return {
        isValid: false,
        error: 'Category cannot be its own parent',
        cyclePath: [parentId],
      };
    }

    const visited = new Set<string>();
    let currentId = parentId;
    const path: string[] = [];

    while (currentId) {
      if (visited.has(currentId)) {
        return {
          isValid: false,
          error: 'Circular reference detected in category hierarchy',
          cyclePath: [...path, currentId],
        };
      }

      if (currentId === excludeId) {
        return {
          isValid: false,
          error: 'Category cannot be a descendant of itself',
          cyclePath: [...path, currentId],
        };
      }

      visited.add(currentId);
      path.push(currentId);

      const category = await this.prisma.category.findUnique({
        where: { id: currentId },
        select: { parentId: true },
      });

      if (!category) {
        return {
          isValid: false,
          error: `Parent category with ID '${currentId}' not found`,
        };
      }

      currentId = category.parentId;
    }

    return { isValid: true };
  }

  /**
   * Build hierarchy tree from flat category list
   */
  private buildHierarchyTree(categories: Category[]): CategoryWithChildren[] {
    const categoryMap = new Map<string, CategoryWithChildren>();
    const rootCategories: CategoryWithChildren[] = [];

    // Create map of all categories
    categories.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Build hierarchy
    categories.forEach(category => {
      const categoryWithChildren = categoryMap.get(category.id)!;

      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children!.push(categoryWithChildren);
        }
      } else {
        rootCategories.push(categoryWithChildren);
      }
    });

    return rootCategories;
  }

  /**
   * Generate slug from name
   */
  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Get category statistics
   */
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    withChildren: number;
    rootCategories: number;
  }> {
    const [total, active, inactive, withChildren, rootCategories] =
      await Promise.all([
        this.prisma.category.count(),
        this.prisma.category.count({ where: { active: true } }),
        this.prisma.category.count({ where: { active: false } }),
        this.prisma.category.count({
          where: {
            children: {
              some: {},
            },
          },
        }),
        this.prisma.category.count({
          where: {
            parentId: null,
            active: true,
          },
        }),
      ]);

    return {
      total,
      active,
      inactive,
      withChildren,
      rootCategories,
    };
  }
}
