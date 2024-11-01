import { environment } from '@/environments/environment';
import { LocalStorageService } from '@/shared/storage/storage.service';
import { Action, ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { AppState } from './../store';

export function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const newState = reducer(state, action);
    const { type, ...rest } = action;

    console.log(`[DEBUG] action: ${type}`, {
      payload: rest,
      oldState: state,
      newState
    });

    return newState;
  };
}

export function initStateFromSessionStorage(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    let newState = reducer(state, action);

    const { settings: settingsState } = newState;

    if ([`${INIT}`, `${UPDATE}`].includes(action.type)) {
      const { settings } = LocalStorageService.loadStateFromLocalStorage();

      newState = {
        ...newState,
        settings: {
          ...settingsState,
          ...settings
        }
      };
    }

    return newState;
  };
}

export const metaReducers: MetaReducer<any, Action>[] = [
  initStateFromSessionStorage
];

if (environment.debug) {
  metaReducers.unshift(debug);
}
