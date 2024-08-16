import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/auth.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private dialog: MatDialog,
    private store: Store<{ auth: AuthState }>,
  ) {}

  signWithGoogle() {
    this.store.dispatch(AuthActions.login());
  }
}
