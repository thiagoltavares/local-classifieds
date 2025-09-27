// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/entities/category.entity.ts

import type { Category as PrismaCategory } from '@prisma/client';

export interface CategoryTranslation {
  id: string;
  categoryId: string;
  language: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryEntity extends PrismaCategory {
  translations?: CategoryTranslation[];
  children?: CategoryEntity[];
  parent?: CategoryEntity;
}

export interface CategoryHierarchyValidation {
  isValid: boolean;
  error?: string;
  cyclePath?: string[];
}

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
  withChildren: number;
  rootCategories: number;
}
