'use client';

import { useTranslations } from '../hooks/useTranslations';

export default function LanguageSwitcher() {
  const { t, locale, router } = useTranslations();

  const switchLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-gray-600'>{t('language')}:</span>
      <div className='flex gap-2'>
        <button
          onClick={() => switchLanguage('pt-BR')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'pt-BR'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('portuguese')}
        </button>
        <button
          onClick={() => switchLanguage('en-US')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'en-US'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('english')}
        </button>
      </div>
    </div>
  );
}
