import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
  isLoading: boolean
  validationErrors: BackendErrorsInterface | null
}
