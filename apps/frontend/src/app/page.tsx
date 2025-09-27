'use client';
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslations();

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>{t('title')}</h1>
          <LanguageSwitcher />
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            {t('welcome')}
          </h2>
          <p className='text-gray-600'>{t('description')}</p>
        </div>
      </div>
    </div>
  );
}
