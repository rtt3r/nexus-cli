import { Theme } from '@/shared/settings';
import { SettingsStore } from '@/store/settings';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html'
})
export class ThemeSelectorComponent {

  private readonly _settingsStore: SettingsStore = inject(SettingsStore);

  handleChangeTheme(theme: Theme) {
    this._settingsStore.changeTheme(theme);
  }
}
