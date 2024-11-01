import { Language, Scheme, Theme } from '@/shared/config';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeLanguage, changeScheme, changeTheme } from './settings.actions';
import { selectLanguage, selectScheme } from './settings.selectors';

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly store: Store = inject(Store);

  readonly language$: Observable<Language> = this.store.select(selectLanguage);
  readonly scheme$: Observable<Scheme | undefined> = this.store.select(selectScheme);

  changeLanguage(language: Language): void {
    this.store.dispatch(changeLanguage({ language }));
  }

  changeScheme(scheme: Scheme): void {
    this.store.dispatch(changeScheme({ scheme }));
  }

  changeTheme(theme: Theme): void {
    this.store.dispatch(changeTheme({ theme }));
  }
}
