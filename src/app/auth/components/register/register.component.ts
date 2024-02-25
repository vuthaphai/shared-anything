import {Component} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {register} from '../../store/actions'
import {RegisterRequestionInterface} from '../../types/register-request.interface'
import {RouterLink} from '@angular/router'
import {selectIsSubmitting} from '../../store/reducers'
import {AuthStateInterface} from '../../types/auth-state.interface'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  isSubmitting$ = this.store.select(selectIsSubmitting)

  constructor(
    private fb: FormBuilder,
    private store: Store<{auth: AuthStateInterface}>
  ) {}

  onSubmit() {
    console.log('form: ', this.form.getRawValue())
    // this.http.post('/register', this.form.getRawValue()).subscribe()
    // this.registerService.register(this.form.getRawValue()).subscribe())
    const request: RegisterRequestionInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(register({request}))
  }
}
