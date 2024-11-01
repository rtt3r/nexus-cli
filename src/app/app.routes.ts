import { AuthorizedGuard } from '@/shared/auth/guards/authorized.guard';
import { UnauthorizedGuard } from '@/shared/auth/guards/unauthorized.guard';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot, Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

const privateGuard: CanActivateFn | CanActivateChildFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    debugger
    return inject(AuthorizedGuard).canActivate(route, state);
  };

const publicGuard: CanActivateFn | CanActivateChildFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    debugger
    return inject(UnauthorizedGuard).canActivate(route, state);
  };

export const APP_ROUTES: Routes = [

  // Redirect empty path to '/'
  // { path: '', pathMatch: 'full', redirectTo: '/' },

  // Auth routes for guests
  {
    path: '',
    canActivate: [publicGuard],
    canActivateChild: [publicGuard],
    component: PublicComponent,
    children: [
      { path: '', loadChildren: () => import('./public/public.routes').then(p => p.ROUTES) }
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [privateGuard],
    canActivateChild: [privateGuard],
    component: PrivateComponent,
    children: [
      { path: '', loadChildren: () => import('./private/private.routes').then(p => p.ROUTES) }
    ]
  }
];
