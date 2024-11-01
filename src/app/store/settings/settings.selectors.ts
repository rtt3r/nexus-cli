import { Language, Scheme, Theme } from '@/shared/config';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from './../../store';
import { SettingsState } from './settings.state';

export const selectSettings: MemoizedSelector<AppState, SettingsState> = createFeatureSelector<SettingsState>('settings');

export const selectScheme: MemoizedSelector<AppState, Scheme> = createSelector(
  selectSettings,
  (state: SettingsState): Scheme => state.scheme
);

export const selectTheme: MemoizedSelector<AppState, Theme> = createSelector(
  selectSettings,
  (state: SettingsState): Theme => state.theme
);

export const selectLanguage: MemoizedSelector<AppState, Language> = createSelector(
  selectSettings,
  (state: SettingsState): Language => state.language
);
