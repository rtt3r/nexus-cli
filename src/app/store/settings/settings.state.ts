import { Language, Scheme, Theme } from '@/shared/config';

export interface SettingsState {
  language: Language,
  scheme: Scheme,
  theme: Theme
}

export const initialState: SettingsState = {
  language: 'pt-br',
  scheme: 'auto',
  theme: 'theme-default'
};
