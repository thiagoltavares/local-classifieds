import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const translations = {
  'pt-BR': {
    title: 'Local Classifieds',
    welcome: 'Bem-vindo ao Local Classifieds',
    description:
      'Plataforma de classificados e marketplace de serviços locais.',
    language: 'Idioma',
    portuguese: 'Português',
    english: 'English',
  },
  'en-US': {
    title: 'Local Classifieds',
    welcome: 'Welcome to Local Classifieds',
    description: 'Local classifieds and service marketplace platform.',
    language: 'Language',
    portuguese: 'Português',
    english: 'English',
  },
};

export function useTranslations() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname (e.g., /en-US/ or /pt-BR/)
  const locale = pathname.startsWith('/en-US') ? 'en-US' : 'pt-BR';

  return {
    t: (key: keyof (typeof translations)['pt-BR']) => translations[locale][key],
    locale,
    router,
  };
}
