import { inject } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { AuthService } from '../services/auth.service'
import { authActions } from './actions'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistanceService } from '../../shared/services/persistance.service'
import { Router } from '@angular/router'

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // window.localStorage.setItem('accessToken', currentUser.token)
            persistanceService.set('accessToken', currentUser.token)
            return authActions.registerSuccess({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  { functional: true }
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {
    functional: true,
    dispatch: false,
  }
)

// export const registerEffect = createEffect(
//   (actions$ = inject(Actions), authService = inject(AuthService)) => {
//     return actions$.pipe()
//   },
//   { functional: true }
// )

///----------
// export const registerEffect = createEffect(
//   (actions$ = inject(Actions), authService = inject(AuthService)) => {
//     return actions$.pipe(
//       ofType(authActions.register),
//       switchMap(({ request }) => {
//         return authService.register(request).pipe(
//           map((currentUser: CurrentUserInterface) => {
//             return authActions.registerSuccess({ currentUser })
//           }),
//           catchError(() => {
//             return of(authActions.registerFailure())
//           })
//         )
//       })
//     )
//   },
//   { functional: true }
// )
