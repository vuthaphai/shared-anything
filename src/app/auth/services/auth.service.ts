import { Observable, map } from 'rxjs'
import { ApiService } from '../../shared/services/api.service'
import { RegisterRequestInterface } from '../types/register-request.interface'

import { AuthResponseInterface } from '../types/auth-response.interface'
import { Injectable } from '@angular/core'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const apiUrl: string = ''
    return this.apiService
      .post<AuthResponseInterface>(apiUrl, data)
      .pipe(map((response) => response.user))
  }
}
