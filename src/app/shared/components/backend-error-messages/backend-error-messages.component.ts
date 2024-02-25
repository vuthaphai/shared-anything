import { Component, Input } from '@angular/core'
import { BackendErrorsInterface } from '../../types/backend-errors.interface'

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './backend-error-messages.component.html',
})
export class BackendErrorMessagesComponent {
  @Input() backendErrors: BackendErrorsInterface = {}

  errorMessages: string[] = []

  ngOnInit() {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ')
      return `${name} ${messages}`
    })
  }
}
