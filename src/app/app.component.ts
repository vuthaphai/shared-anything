import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TopBarComponent } from './shared/components/top-bar/top-bar.component'
import { Store } from '@ngrx/store'
import { authActions } from './auth/store/actions'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, TopBarComponent],
})
export class AppComponent implements OnInit {
  title = 'shared-anything'

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser())
  }
}
