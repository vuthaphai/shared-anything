import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { RegisterRequestInterface } from '../types/register-request.interface'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface'

export const authActions = createActionGroup({
  source: '',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
  },
})

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// )

// export const registerSuccess = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// )

// export const registerFailure = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// )
