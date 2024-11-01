import { environment as env } from '@/environments/environment';
import { metaReducers } from '@/store/meta-reducers';
import { CustomRouterStateSerializer } from '@/store/router';
import { settingsEffects, settingsReducers } from '@/store/settings';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { TranslocoHttpLoader } from './shared/i18n/transloco-http-loader';

const { auth } = env;

export const appConfig: ApplicationConfig = {
  providers: [
    // importProvidersFrom(
    //   KeycloakAngularModule
    // ),
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
    // Nexus
    // provideAuth(),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (keycloak: KeycloakService) => {

    //     keycloak.keycloakEvents$
    //       .subscribe({
    //         next(event) {
    //           if (event.type == KeycloakEventType.OnTokenExpired) {
    //             keycloak.updateToken(20);
    //           }
    //         }
    //       });

    //     return () =>
    //       keycloak.init({
    //         config: {
    //           url: auth.url,
    //           realm: auth.realm,
    //           clientId: auth.clientId
    //         },
    //         initOptions: {
    //           onLoad: 'login-required',
    //           checkLoginIframe: false,
    //           checkLoginIframeInterval: 60,
    //           flow: 'standard',
    //           pkceMethod: 'S256',
    //           responseMode: 'query'
    //         },
    //         enableBearerInterceptor: true,
    //         bearerExcludedUrls: ['/assets']
    //       });
    //   },
    //   multi: true,
    //   deps: [KeycloakService]
    // }
  ],
};
