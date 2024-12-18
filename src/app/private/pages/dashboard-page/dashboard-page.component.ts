import { ThemeSelectorComponent } from '@/shared/components/theme-selector/theme-selector.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard-page.component.html',
  imports: [
    CommonModule,
    ThemeSelectorComponent
  ],
})
export class DashboardPageComponent {

  private readonly _keycloakService: KeycloakService = inject(KeycloakService);

  handleSignOut() {
    this._keycloakService.logout();
  }

}
