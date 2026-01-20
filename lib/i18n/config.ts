export const locales = ['he', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'he';

export const localeNames: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
  ar: 'العربية',
};

export const localeDirections: Record<Locale, 'rtl' | 'ltr'> = {
  he: 'rtl',
  en: 'ltr',
  ar: 'rtl',
};
