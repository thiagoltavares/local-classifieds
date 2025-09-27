// /Users/thiagotavares/Projects/Services/libs/shared/src/dto/category.dto.ts

import { z } from 'zod';

// Base validation schemas for reusability
const CategoryNameSchema = z
  .string()
  .min(3, 'Category name must be at least 3 characters')
  .max(120, 'Category name cannot exceed 120 characters')
  .trim()
  .refine(name => name.length > 0, 'Category name cannot be empty');

const CategorySlugSchema = z
  .string()
  .min(3, 'Slug must be at least 3 characters')
  .max(140, 'Slug cannot exceed 140 characters')
  .regex(
    /^[a-z0-9-]+$/,
    'Slug must contain only lowercase letters, numbers, and hyphens'
  )
  .refine(
    slug => !slug.startsWith('-') && !slug.endsWith('-'),
    'Slug cannot start or end with a hyphen'
  )
  .refine(
    slug => !slug.includes('--'),
    'Slug cannot contain consecutive hyphens'
  );

const CategoryDescriptionSchema = z
  .string()
  .max(500, 'Description cannot exceed 500 characters')
  .optional()
  .or(z.literal(''));

const CategoryParentIdSchema = z
  .string()
  .uuid('Invalid parent category ID format')
  .optional();

const CategoryDisplayOrderSchema = z
  .number()
  .int('Display order must be an integer')
  .min(0, 'Display order cannot be negative')
  .max(9999, 'Display order cannot exceed 9999');

// Translation DTO
export const CategoryTranslationDto = z.object({
  language: z
    .string()
    .min(2, 'Language code must be at least 2 characters')
    .max(5, 'Language code too long'),
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

// Create Category DTO
export const CreateCategoryDto = z
  .object({
    slug: CategorySlugSchema,
    parentId: CategoryParentIdSchema,
    displayOrder: CategoryDisplayOrderSchema.default(0),
    translations: z
      .array(CategoryTranslationDto)
      .min(1, 'At least one translation is required'),
  })
  .refine(
    () => {
      // Custom validation: if parentId is provided, it should not be the same as the category being created
      // This will be handled at the service level, but we can add basic validation here
      return true;
    },
    {
      message: 'Invalid category hierarchy',
      path: ['parentId'],
    }
  );

// Update Category DTO
export const UpdateCategoryDto = z
  .object({
    slug: CategorySlugSchema.optional(),
    parentId: CategoryParentIdSchema,
    active: z.boolean().optional(),
    displayOrder: CategoryDisplayOrderSchema.optional(),
    translations: z.array(CategoryTranslationDto).optional(),
  })
  .refine(
    data => {
      // Ensure at least one field is provided for update
      const hasUpdateFields = Object.keys(data).some(
        key => data[key as keyof typeof data] !== undefined
      );
      return hasUpdateFields;
    },
    {
      message: 'At least one field must be provided for update',
    }
  );

// Category Parameters DTO (for URL params)
export const CategoryParamsDto = z.object({
  id: z.string().uuid('Invalid category ID format'),
});

// Category Slug Parameters DTO (for URL params with slug)
export const CategorySlugParamsDto = z.object({
  slug: CategorySlugSchema,
});

// Category Query DTO (for filtering and pagination)
export const CategoryQueryDto = z.object({
  includeInactive: z.coerce.boolean().default(false),
  includeChildren: z.coerce.boolean().default(false),
  parentId: z.string().uuid('Invalid parent category ID format').optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(20),
  offset: z.coerce
    .number()
    .int()
    .min(0, 'Offset cannot be negative')
    .default(0),
  sortBy: z
    .enum(['name', 'displayOrder', 'createdAt', 'updatedAt'])
    .default('displayOrder'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// Category Hierarchy Query DTO (for getting hierarchy tree)
export const CategoryHierarchyQueryDto = z.object({
  includeInactive: z.coerce.boolean().default(false),
  maxDepth: z.coerce
    .number()
    .int()
    .min(1, 'Max depth must be at least 1')
    .max(10, 'Max depth cannot exceed 10')
    .default(5),
});

// Category Search DTO (for searching categories)
export const CategorySearchDto = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query too long'),
  includeInactive: z.coerce.boolean().default(false),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

// Category Bulk Operations DTO
export const CategoryBulkUpdateDto = z.object({
  ids: z
    .array(z.string().uuid('Invalid category ID format'))
    .min(1, 'At least one category ID is required')
    .max(100, 'Cannot update more than 100 categories at once'),
  updates: z.object({
    active: z.boolean().optional(),
    displayOrder: CategoryDisplayOrderSchema.optional(),
  }),
});

// Category Hierarchy Validation DTO
export const CategoryHierarchyValidationDto = z.object({
  parentId: z.string().uuid('Invalid parent category ID format'),
  excludeId: z.string().uuid('Invalid exclude category ID format').optional(),
});

// Category Statistics Query DTO
export const CategoryStatsQueryDto = z.object({
  includeInactive: z.coerce.boolean().default(false),
  groupBy: z.enum(['parent', 'active', 'createdAt']).optional(),
});

// Category Response DTOs (for API responses)
export const CategoryResponseDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentId: z.string().uuid().nullable(),
  active: z.boolean(),
  displayOrder: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Define the recursive type for category with children
type CategoryWithChildrenType = z.infer<typeof CategoryResponseDto> & {
  children?: CategoryWithChildrenType[];
  parent?: z.infer<typeof CategoryResponseDto>;
};

export const CategoryWithChildrenResponseDto: z.ZodType<CategoryWithChildrenType> =
  z.lazy(() =>
    CategoryResponseDto.extend({
      children: z.array(CategoryWithChildrenResponseDto).optional(),
      parent: CategoryResponseDto.optional(),
    })
  );

// Category List Response DTO
export const CategoryListResponseDto = z.object({
  categories: z.array(CategoryWithChildrenResponseDto),
  pagination: z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    hasMore: z.boolean(),
  }),
});

// Category Statistics Response DTO
export const CategoryStatsResponseDto = z.object({
  total: z.number(),
  active: z.number(),
  inactive: z.number(),
  withChildren: z.number(),
  rootCategories: z.number(),
});

// Type exports
export type CategoryTranslationDtoType = z.infer<typeof CategoryTranslationDto>;
export type CreateCategoryDtoType = z.infer<typeof CreateCategoryDto>;
export type UpdateCategoryDtoType = z.infer<typeof UpdateCategoryDto>;
export type CategoryParamsDtoType = z.infer<typeof CategoryParamsDto>;
export type CategorySlugParamsDtoType = z.infer<typeof CategorySlugParamsDto>;
export type CategoryQueryDtoType = z.infer<typeof CategoryQueryDto>;
export type CategoryHierarchyQueryDtoType = z.infer<
  typeof CategoryHierarchyQueryDto
>;
export type CategorySearchDtoType = z.infer<typeof CategorySearchDto>;
export type CategoryBulkUpdateDtoType = z.infer<typeof CategoryBulkUpdateDto>;
export type CategoryHierarchyValidationDtoType = z.infer<
  typeof CategoryHierarchyValidationDto
>;
export type CategoryStatsQueryDtoType = z.infer<typeof CategoryStatsQueryDto>;
export type CategoryResponseDtoType = z.infer<typeof CategoryResponseDto>;
export type CategoryWithChildrenResponseDtoType = z.infer<
  typeof CategoryWithChildrenResponseDto
>;
export type CategoryListResponseDtoType = z.infer<
  typeof CategoryListResponseDto
>;
export type CategoryStatsResponseDtoType = z.infer<
  typeof CategoryStatsResponseDto
>;

// Utility functions for DTOs
export const CategoryDtoUtils = {
  /**
   * Generate a slug from a category name
   */
  generateSlug: (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  },

  /**
   * Validate slug format
   */
  isValidSlug: (slug: string): boolean => {
    return CategorySlugSchema.safeParse(slug).success;
  },

  /**
   * Sanitize category name
   */
  sanitizeName: (name: string): string => {
    return name.trim().replace(/\s+/g, ' ');
  },

  /**
   * Sanitize category description
   */
  sanitizeDescription: (description: string): string => {
    return description.trim().replace(/\s+/g, ' ');
  },

  /**
   * Get translated name for a category
   */
  getTranslatedName: (
    translations: Array<{ language: string; name: string }>,
    language: string = 'pt'
  ): string => {
    const translation = translations.find(t => t.language === language);
    if (!translation) {
      // Fallback to first available translation or 'pt'
      const fallback =
        translations.find(t => t.language === 'pt') || translations[0];
      return fallback?.name || 'Untitled';
    }
    return translation.name;
  },

  /**
   * Get translated description for a category
   */
  getTranslatedDescription: (
    translations: Array<{ language: string; description?: string | null }>,
    language: string = 'pt'
  ): string | null => {
    const translation = translations.find(t => t.language === language);
    if (!translation) {
      // Fallback to first available translation or 'pt'
      const fallback =
        translations.find(t => t.language === 'pt') || translations[0];
      return fallback?.description || null;
    }
    return translation.description || null;
  },
};
