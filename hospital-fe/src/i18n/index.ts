import en from './locales/en';

/** Type representing the structure of translation messages */
export type MessageSchema = typeof en;

/**
 * Translation message store with locale keys
 * @private
 */
const messages: Record<string, MessageSchema> = {
  en
};

/** Current active locale */
let currentLocale = 'en';

/**
 * Internationalization utility for managing translations
 */
export const i18n = {
  /**
   * Translates a key into the current locale's message
   * @param {keyof MessageSchema} key - The translation key to look up
   * @returns {string} Translated message or the key if not found
   */
  t(key: keyof MessageSchema): string {
    const keys = key.split('.');
    let value = messages[currentLocale];
    
    for (const k of keys) {
      value = value[k as keyof typeof value] as any;
      if (value === undefined) return key;
    }
    
    return value as string;
  },
  
  /**
   * Sets the active locale for translations
   * @param {string} locale - The locale code to set
   */
  setLocale(locale: string) {
    if (messages[locale]) {
      currentLocale = locale;
    }
  },
  
  /**
   * Gets the current active locale
   * @returns {string} Current locale code
   */
  getLocale(): string {
    return currentLocale;
  }
}; 