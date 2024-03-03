import { Component } from '@angular/core'

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { AuthStateInterface } from '../../types/auth-state.interface'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component'
import { combineLatest } from 'rxjs'
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers'
import { LoginRequestInterface } from '../../types/login-request.interface'
import { authActions } from '../../store/actions'

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class LoginComponent {
  form: FormGroup = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>
  ) {}

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({ request }))
  }
}
