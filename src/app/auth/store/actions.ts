import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { RegisterRequestInterface } from '../types/register-request.interface'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface'
import { LoginRequestInterface } from '../types/login-request.interface'

export const authActions = createActionGroup({
  source: '',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),
    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current user failure': emptyProps(),
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
