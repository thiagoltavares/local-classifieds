// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/dto/category-query.dto.ts

import { z } from 'zod';

export const CategoryQuerySchema = z.object({
  includeChildren: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  includeInactive: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  parentId: z.string().uuid().optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});

export type CategoryQueryDto = z.infer<typeof CategoryQuerySchema>;
