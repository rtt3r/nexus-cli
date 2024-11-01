import { AppSettings } from '@/shared/settings';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { changeLanguage, changeTheme } from './settings.actions';
import { initialState } from './settings.state';

export const settingsReducers: ActionReducer<AppSettings> = createReducer(
  initialState,
  on(changeLanguage, (state: AppSettings, { language }) => {
    return {
      ...state,
      language: language
    }
  }),
  on(changeTheme, (state: AppSettings, { theme }) => {
    return {
      ...state,
      theme: theme
    }
  })
);
