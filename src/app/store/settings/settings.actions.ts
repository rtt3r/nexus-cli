import { Language, Theme } from '@/shared/settings';
import { createAction, props } from '@ngrx/store';

export const actionKey = '[Settings]';

export const changeScheme = createAction(
  `${actionKey} Change Scheme`,
  props<{ scheme: Theme }>()
);

export const changeTheme = createAction(
  `${actionKey} Change Theme`,
  props<{ theme: Theme }>()
);

export const changeLanguage = createAction(
  `${actionKey} Change Language`,
  props<{ language: Language }>()
);
