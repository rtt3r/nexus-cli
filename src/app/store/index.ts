import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router';
import { SettingsState } from './settings';

export interface AppState {
  settings?: SettingsState;
  router?: RouterReducerState<RouterStateUrl>;
}
