import { Route } from '@angular/router'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'

export const authRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
]
