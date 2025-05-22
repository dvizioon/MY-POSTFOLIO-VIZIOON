
"use client";
import { useLanguageContext } from '@/contexts/LanguageContext';

// This hook provides direct access to the translations object for the current locale.
export const useTranslations = () => {
  const { translations } = useLanguageContext();
  return translations;
};
