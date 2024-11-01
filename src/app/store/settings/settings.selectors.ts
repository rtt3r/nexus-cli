import { AppSettings, Language, Theme } from '@/shared/settings';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '..';

export const selectSettings: MemoizedSelector<AppState, AppSettings> = createFeatureSelector<AppSettings>('settings');

export const selectTheme: MemoizedSelector<AppState, Theme> = createSelector(
  selectSettings,
  (state: AppSettings): Theme => state.theme
);

export const selectLanguage: MemoizedSelector<AppState, Language> = createSelector(
  selectSettings,
  (state: AppSettings): Language => state.language
);
