import { AppSettings } from '@/shared/settings';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router';

export interface AppState {
  settings?: AppSettings;
  router?: RouterReducerState<RouterStateUrl>;
}
