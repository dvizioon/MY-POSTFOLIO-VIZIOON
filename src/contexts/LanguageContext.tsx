
"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import enTranslations from '@/locales/en.json'; // Import directly
import ptTranslations from '@/locales/pt.json'; // Import directly

export type Locale = 'en' | 'pt';

// Define a more specific type for your translations based on one of the files
// This improves type safety when accessing t.some.key
type Translations = typeof enTranslations; 

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Translations;
}

const translationsMap: Record<Locale, Translations> = { 
  en: enTranslations, 
  pt: ptTranslations 
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('pt'); // Default to Portuguese

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem('locale') as Locale | null;
      if (storedLocale && (storedLocale === 'en' || storedLocale === 'pt')) {
        setLocale(storedLocale);
      } else {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en' || browserLang === 'pt') {
          setLocale(browserLang as Locale);
        } else {
          setLocale('pt'); // Default
        }
      }
    }
  }, [setLocale]);
  
  const currentTranslations = translationsMap[locale] || translationsMap.pt;


  return (
    <LanguageContext.Provider value={{ locale, setLocale, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
