'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Locale = 'en' | 'pt' | 'es';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
  loadNamespace: (namespace: string) => Promise<void>;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  initialLocale = 'en',
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [translations, setTranslations] = useState<
    Record<string, Record<string, string>>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        // Load common translations
        const commonData = await import(`../../i18n/${locale}/common.json`);
        setTranslations(prev => ({
          ...prev,
          common: commonData.default as unknown as Record<string, string>,
        }));
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error);
        // Fallback to English
        if (locale !== 'en') {
          try {
            const fallbackData = await import(`../../i18n/en/common.json`);
            setTranslations(prev => ({
              ...prev,
              common: fallbackData.default as unknown as Record<string, string>,
            }));
          } catch (fallbackError) {
            console.error(
              'Failed to load fallback translations:',
              fallbackError
            );
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadTranslations();
  }, [locale]);

  const loadNamespace = async (namespace: string) => {
    try {
      const data = await import(`../../i18n/${locale}/${namespace}.json`);
      setTranslations(prev => ({
        ...prev,
        [namespace]: data.default as Record<string, string>,
      }));
    } catch (error) {
      console.error(`Failed to load ${namespace} translations:`, error);
    }
  };

  const t = (key: string, params?: Record<string, string>) => {
    const [namespace, ...keyParts] = key.split('.');
    const translationKey = keyParts.join('.');

    let translation: string = translations[namespace]?.[translationKey] || key;

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, value);
      });
    }

    return translation;
  };

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    // Update URL with new locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const value = {
    locale,
    setLocale: handleSetLocale,
    t,
    isLoading,
    loadNamespace,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook for loading specific namespaces
export function useTranslations(namespace: string) {
  const { t, loadNamespace, isLoading } = useI18n();

  useEffect(() => {
    void loadNamespace(namespace);
  }, [namespace, loadNamespace]);

  return {
    t: (key: string, params?: Record<string, string>) =>
      t(`${namespace}.${key}`, params),
    isLoading,
  };
}
