import { Language, Theme } from '@/shared/settings';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeLanguage, changeTheme } from './settings.actions';
import { selectLanguage, selectTheme } from './settings.selectors';

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly store: Store = inject(Store);

  readonly language$: Observable<Language> = this.store.select(selectLanguage);
  readonly scheme$: Observable<Theme | undefined> = this.store.select(selectTheme);

  changeLanguage(language: Language): void {
    this.store.dispatch(changeLanguage({ language }));
  }

  changeTheme(theme: Theme): void {
    this.store.dispatch(changeTheme({ theme }));
  }
}
