import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'

import { appRoutes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { provideStore, provideState } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { authFeatureKey, authReducer } from './auth/store/reducers'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideEffects } from '@ngrx/effects'
import * as authEffects from './auth/store/effects'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'
import { authInterceptor } from './shared/services/auth-interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideStore({ router: routerReducer }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
}
