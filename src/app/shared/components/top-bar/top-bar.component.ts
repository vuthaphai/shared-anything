import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { selectCurrentUser } from '../../../auth/store/reducers'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })
  constructor(private store: Store) {}
}
