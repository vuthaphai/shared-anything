import {createAction, props} from '@ngrx/store'
import {RegisterRequestionInterface} from '../types/register-request.interface'

export const register = createAction(
  '[Auth] Register',
  props<{request: RegisterRequestionInterface}>()
)
