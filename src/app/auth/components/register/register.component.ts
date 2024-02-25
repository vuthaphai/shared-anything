import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { authActions } from '../../store/actions'
import { RegisterRequestInterface } from '../../types/register-request.interface'
import { RouterLink } from '@angular/router'
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers'
import { AuthStateInterface } from '../../types/auth-state.interface'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth.service'

import { combineLatest } from 'rxjs'
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  // isSubmitting$ = this.store.select(selectIsSubmitting)
  // backendErrors$ = this.store.select(selectValidationErrors)

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }> // private authService: AuthService
  ) {}

  onSubmit() {
    console.log('form: ', this.form.getRawValue())
    // this.http.post('/register', this.form.getRawValue()).subscribe()
    // this.registerService.register(this.form.getRawValue()).subscribe())
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({ request }))
    // this.authService
    //   .register(request)
    //   .subscribe({ next: (response) => console.log('response: ', response) })
  }
}
