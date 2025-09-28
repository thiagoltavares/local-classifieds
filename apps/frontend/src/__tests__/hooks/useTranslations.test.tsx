import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTranslations } from '../../hooks/useTranslations';

// Mock the I18nProvider context
jest.mock('../../app/providers', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    loadNamespace: jest.fn(),
    isLoading: false,
  }),
}));

describe('useTranslations', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useTranslations());

    expect(typeof result.current.t).toBe('function');
  });

  it('translates keys correctly', () => {
    const { result } = renderHook(() => useTranslations());

    const translation = result.current.t('title');
    expect(translation).toBe('Local Classifieds');
  });

  it('returns locale and router', () => {
    const { result } = renderHook(() => useTranslations());

    expect(result.current.locale).toBeDefined();
    expect(result.current.router).toBeDefined();
  });
});
