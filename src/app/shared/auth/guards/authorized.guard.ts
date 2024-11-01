import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      const redirectUrl = state.url === '/sign-out'
        ? ''
        : `${window.location.href}`;

      await this.keycloak.login({
        redirectUri: redirectUrl
      });

      return false;
    }

    // Get the roles required from the route.
    const roles = route.data['roles'];

    if (typeof roles === 'string') {
      return this.roles.includes(roles);
    }

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(roles) || !roles.length) {
      return true;
    }

    // Allow the user to proceed if some the required roles are present.
    return roles.some((role) => this.roles.includes(role));
  }
}

