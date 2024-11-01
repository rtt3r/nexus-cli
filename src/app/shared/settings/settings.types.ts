// Types
export type Theme = 'auto' | 'dark' | 'light';
export type Language = 'en' | 'pt-br';

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppSettings {
  theme: Theme;
  language: Language;
}
