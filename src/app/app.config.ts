import { environment } from '@/environments/environment';
import { metaReducers } from '@/store/meta-reducers';
import { CustomRouterStateSerializer } from '@/store/router';
import { settingsEffects, settingsReducers } from '@/store/settings';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { KeycloakAngularModule, KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { APP_ROUTES } from './app.routes';
import { TranslocoHttpLoader } from './shared/i18n/transloco-http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    // Ngrx
    provideStore({
      settings: settingsReducers,
      router: routerReducer
    }, { metaReducers }),
    provideRouterStore({
      serializer: CustomRouterStateSerializer
    }),
    provideEffects([
      settingsEffects
    ]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    // Transloco
    provideTransloco({
      config: {
        availableLangs: [
          { id: 'en', label: 'English' },
          { id: 'pt-br', label: 'Português' },
        ],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    importProvidersFrom(KeycloakAngularModule),
    // Nexus
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloak: KeycloakService) => {

        keycloak.keycloakEvents$
          .subscribe({
            next(event) {
              if (event.type == KeycloakEventType.OnTokenExpired) {
                keycloak.updateToken(20);
              }
            }
          });

        return () => {
          const { auth: { url, realm, clientId } } = environment;

          return keycloak.init({
            config: {
              url: url,
              realm: realm,
              clientId: clientId
            },
            initOptions: {
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
              checkLoginIframeInterval: 60,
              silentCheckSsoFallback: false,
              responseMode: 'fragment',
              redirectUri: `${window.location.origin}`
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['/assets']
          });
        }
      },
      multi: true,
      deps: [KeycloakService]
    }
  ],
};
