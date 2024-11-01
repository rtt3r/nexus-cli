import { LocalStorageService } from '@/shared/storage/storage.service';
import { TitleService } from '@/shared/title/title.service';
import { inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, filter, tap, withLatestFrom } from 'rxjs/operators';
import { selectRouteStateUrl } from '../router/router.selectors';
import { changeLanguage } from './settings.actions';
import { selectLanguage, selectSettings } from './settings.selectors';

export const setLanguageEffect$ = createEffect(
  (
    store$: Store = inject(Store),
    actions$: Actions = inject(Actions),
    translocoService$: TranslocoService = inject(TranslocoService)
  ) => {
    return actions$.pipe(
      ofType(ROOT_EFFECTS_INIT, changeLanguage),
      withLatestFrom(store$.pipe(
        select(selectLanguage),
        distinctUntilChanged()
      )),
      tap(([_, language]) => {
        translocoService$.load(language);
        translocoService$.setActiveLang(language);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const setTitleEffect$ = createEffect(
  (
    store$: Store = inject(Store),
    titleService$: TitleService = inject(TitleService),
    router: Router = inject(Router)
  ) => {
    return router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        withLatestFrom(store$.pipe(select(selectRouteStateUrl))),
        tap(([_, state]) => {
          const { title = '' } = state?.data ?? {};
          titleService$.setTitle(title);
        })
      );
  },
  { functional: true, dispatch: false }
);

export const persistSettingsEffect$ = createEffect(
  (
    store$: Store = inject(Store),
    storageService$: LocalStorageService = inject(LocalStorageService)
  ) => {
    return store$
      .pipe(
        select(selectSettings),
        distinctUntilChanged(),
        tap(settings => {
          const { theme, language } = settings;

          storageService$.setItem(
            'settings',
            {
              theme,
              language
            });
        })
      )
  },
  { functional: true, dispatch: false }
);
