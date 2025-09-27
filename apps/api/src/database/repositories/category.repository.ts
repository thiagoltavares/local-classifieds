// /Users/thiagotavares/Projects/Services/apps/api/src/database/repositories/category.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../libs/database/src/prisma.service';
import type { Category } from '@prisma/client';
import {
  CategoryWithChildren,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryQueryOptions,
} from '../../libs/database/src/types';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryData): Promise<Category> {
    return this.prisma.category.create({
      data: {
        slug: data.slug,
        parentId: data.parentId || null,
        displayOrder: data.displayOrder || 0,
      },
    });
  }

  async findById(
    id: string,
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren | null> {
    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<{ displayOrder: 'asc' | 'desc' }>;
      };
      translations?: boolean;
    } = {
      translations: true,
    };

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    return this.prisma.category.findUnique({
      where: { id },
      include,
    });
  }

  async findBySlug(
    slug: string,
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren | null> {
    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<{ displayOrder: 'asc' | 'desc' }>;
      };
      translations?: boolean;
    } = {
      translations: true,
    };

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    return this.prisma.category.findUnique({
      where: { slug },
      include,
    });
  }

  async findAll(
    options: CategoryQueryOptions = {},
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
        orderBy: Array<{ displayOrder: 'asc' | 'desc' }>;
      };
      translations?: boolean;
    } = {
      translations: true,
    };

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    return this.prisma.category.findMany({
      where,
      include,
      orderBy: [{ displayOrder: 'asc' }],
      take: options.limit,
      skip: options.offset,
    });
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        active: false,
        updatedAt: new Date(),
      },
    });
  }

  async restore(id: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        active: true,
        updatedAt: new Date(),
      },
    });
  }

  async findMany(where: any): Promise<Category[]> {
    return this.prisma.category.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }],
    });
  }

  async count(where: any): Promise<number> {
    return this.prisma.category.count({ where });
  }

  async findUnique(where: any): Promise<Category | null> {
    return this.prisma.category.findUnique({ where });
  }

  async findFirst(where: any): Promise<Category | null> {
    return this.prisma.category.findFirst({ where });
  }
}
