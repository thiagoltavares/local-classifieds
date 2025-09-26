// /Users/thiagotavares/Projects/Services/libs/database/src/types.ts

import type { Category } from '../dist/generated/client';

// Re-export Prisma types
export type { Category };

// Custom Category interface with additional computed properties
export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
}

// Category hierarchy validation result
export interface CategoryHierarchyValidation {
  isValid: boolean;
  error?: string;
  cyclePath?: string[];
}

// Category creation/update data
export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  displayOrder?: number;
}

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  active?: boolean;
  displayOrder?: number;
}

// Category query options
export interface CategoryQueryOptions {
  includeInactive?: boolean;
  includeChildren?: boolean;
  parentId?: string | null;
  limit?: number;
  offset?: number;
}
