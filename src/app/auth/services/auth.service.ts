import { Observable, map } from 'rxjs'
import { ApiService } from '../../shared/services/api.service'
import { RegisterRequestInterface } from '../types/register-request.interface'

import { AuthResponseInterface } from '../types/auth-response.interface'
import { Injectable } from '@angular/core'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { LoginRequestInterface } from '../types/login-request.interface'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  getCurrentUser() {
    const apiUrl: string = '/user'
    return this.apiService
      .get<AuthResponseInterface>(apiUrl)
      .pipe(map(this.getUser))
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const apiUrl: string = '/users'
    return this.apiService
      .post<AuthResponseInterface>(apiUrl, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const apiUrl: string = '/users/login'
    return this.apiService
      .post<AuthResponseInterface>(apiUrl, data)
      .pipe(map(this.getUser))
  }
}
