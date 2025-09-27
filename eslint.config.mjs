// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules/',
      'dist/',
      'build/',
      '.next/',
      'out/',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      'apps/**/.next/**',
      'coverage/',
      '**/*.config.mjs',
      '**/*.config.js',
      '**/next-env.d.ts',
    ],
  },

  // Base configuration for all files
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,

  // Common rules for all TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
    },
  },

  // Backend (NestJS API) specific rules
  {
    files: ['apps/api/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: ['./apps/api/tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // NestJS-specific tweaks can go here
    },
  },

  // Frontend (Next.js) specific rules
  {
    files: ['apps/frontend/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: ['./apps/frontend/tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // React/Next-specific tweaks can go here
    },
  },

  // Test files
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // TypeScript recommended rules (only for TS files)
  ...tseslint.configs.recommendedTypeChecked,
];
