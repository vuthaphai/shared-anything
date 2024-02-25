import {ApplicationConfig, isDevMode} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideClientHydration} from '@angular/platform-browser'
import {provideStore, provideState} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {authFeatureKey, authReducer} from './auth/store/reducers'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
}
