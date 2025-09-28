# 🎨 Frontend Architecture - Local Classifieds

## 📋 Visão Geral

O frontend do Local Classifieds é construído com Next.js 13+ utilizando App Router, TypeScript, TailwindCSS e um design system consistente. A arquitetura é modular, escalável e otimizada para performance e SEO.

## 🏗️ Estrutura de Diretórios

```
apps/frontend/src/
├── app/                    # App Router (Next.js 13+)
│   ├── [locale]/          # Internacionalização
│   │   ├── admin/         # Dashboard administrativo
│   │   │   └── page.tsx   # Página de administração
│   │   ├── components-demo/ # Demonstração de componentes
│   │   │   └── page.tsx   # Página de demonstração
│   │   ├── layout.tsx     # Layout com sidebar
│   │   └── page.tsx       # Página inicial
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página raiz
├── components/            # Componentes React
│   ├── ui/               # Design System
│   │   ├── Button.tsx    # Botão reutilizável
│   │   ├── Select.tsx    # Select com validação
│   │   ├── Modal.tsx     # Modal responsivo
│   │   ├── Spinner.tsx   # Loading states
│   │   ├── Card.tsx      # Card component
│   │   ├── Input.tsx     # Input component
│   │   ├── Badge.tsx     # Badge component
│   │   ├── Typography.tsx # Typography system
│   │   ├── Stack.tsx     # Layout component
│   │   ├── Divider.tsx   # Divider component
│   │   ├── Sidebar.tsx   # Sidebar navigation
│   │   └── index.ts      # Exports centralizados
│   └── LanguageSwitcher.tsx # Seletor de idioma
├── hooks/                # Custom Hooks
│   └── useTranslations.ts # Hook de tradução
├── utils/                # Utilitários
│   └── cn.ts            # Class name helper
└── middleware.ts         # Middleware do Next.js
```

## 🎨 Design System

### Componentes Base

#### Button Component

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
        )}
        disabled={loading}
        {...props}
      >
        {loading && <Spinner size="sm" className="mr-2" />}
        {children}
      </button>
    );
  }
);
```

#### Select Component

```typescript
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border rounded-md shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
            error
              ? 'border-red-300 text-red-900'
              : 'border-neutral-300 text-neutral-900',
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);
```

#### Modal Component

```typescript
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className={cn(
        'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto',
        sizeClasses[size]
      )}>
        {title && (
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
```

### Sistema de Cores

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
    },
  },
};
```

## 🌐 Internacionalização (i18n)

### Estrutura de Traduções

```
translations/
├── en/
│   ├── common.json
│   ├── navigation.json
│   └── admin.json
└── pt/
    ├── common.json
    ├── navigation.json
    └── admin.json
```

### Hook de Tradução

```typescript
// hooks/useTranslations.ts
export const useTranslations = (namespace: string) => {
  const { locale } = useRouter();
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const data = await import(
          `../../translations/${locale}/${namespace}.json`
        );
        setTranslations(data.default);
      } catch (error) {
        console.error(`Failed to load translations for ${namespace}:`, error);
      }
    };

    loadTranslations();
  }, [locale, namespace]);

  const t = (key: string, params?: Record<string, string>) => {
    let translation = translations[key] || key;

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, value);
      });
    }

    return translation;
  };

  return { t, locale };
};
```

### Uso em Componentes

```typescript
// components/LanguageSwitcher.tsx
export const LanguageSwitcher: React.FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslations('common');

  const changeLanguage = (newLocale: string) => {
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };

  return (
    <Select
      value={locale}
      onChange={(e) => changeLanguage(e.target.value)}
      options={[
        { value: 'en', label: t('languages.english') },
        { value: 'pt', label: t('languages.portuguese') },
      ]}
    />
  );
};
```

## 🎯 Páginas e Roteamento

### App Router Structure

```typescript
// app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className="min-h-screen bg-neutral-50">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

### Página de Administração

```typescript
// app/[locale]/admin/page.tsx
export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { t } = useTranslations('admin');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <H1>{t('categories.title')}</H1>
        <Button onClick={() => setShowAddModal(true)}>
          {t('categories.add')}
        </Button>
      </div>

      <Card>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500">{t('categories.empty')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map(category => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('categories.add')}
      >
        <AddCategoryForm onSuccess={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}
```

## 🎨 Styling e Design

### TailwindCSS Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          // ... outras cores
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
```

### Utility Functions

```typescript
// utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 🧪 Testes

### Component Testing

```typescript
// components/ui/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Page Testing

```typescript
// app/[locale]/admin/__tests__/page.test.tsx
import { render, screen } from '@testing-library/react';
import AdminPage from '../page';

// Mock do hook de tradução
jest.mock('../../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => key,
  }),
}));

describe('AdminPage', () => {
  it('renders admin page', () => {
    render(<AdminPage />);
    expect(screen.getByText('categories.title')).toBeInTheDocument();
  });
});
```

## 🚀 Performance

### Code Splitting

```typescript
// Lazy loading de componentes
const AdminPage = lazy(() => import('./admin/page'));
const ComponentsDemo = lazy(() => import('./components-demo/page'));

// Uso com Suspense
<Suspense fallback={<Spinner />}>
  <AdminPage />
</Suspense>
```

### Image Optimization

```typescript
import Image from 'next/image';

// Otimização automática de imagens
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority // Para imagens acima da dobra
/>
```

### Bundle Analysis

```bash
# Análise do bundle
npm run build
npm run analyze
```

## 📱 Responsive Design

### Breakpoints

```typescript
// TailwindCSS breakpoints
const breakpoints = {
  sm: '640px', // Mobile landscape
  md: '768px', // Tablet
  lg: '1024px', // Desktop
  xl: '1280px', // Large desktop
  '2xl': '1536px', // Extra large
};
```

### Responsive Components

```typescript
// Componente responsivo
export const ResponsiveGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {children}
    </div>
  );
};
```

## 🔍 SEO e Meta Tags

### Metadata API

```typescript
// app/[locale]/admin/page.tsx
export const metadata: Metadata = {
  title: 'Admin Dashboard | Local Classifieds',
  description: 'Manage categories and content',
  keywords: ['admin', 'dashboard', 'categories'],
  openGraph: {
    title: 'Admin Dashboard',
    description: 'Manage categories and content',
    type: 'website',
  },
};
```

### Structured Data

```typescript
// components/StructuredData.tsx
export const StructuredData: React.FC<{ data: any }> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
```

## 🛠️ Development Tools

### ESLint Configuration

```javascript
// eslint.config.mjs
export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🚀 Deploy e CI/CD

### Build Optimization

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
};

export default nextConfig;
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Local Classifieds
```

---

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
