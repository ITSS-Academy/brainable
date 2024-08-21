import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { SharedModule } from '../../shared/modules/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, SharedModule, RouterLink, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() menuClick = new EventEmitter<void>();

  dialog = inject(MatDialog);
  profile$ = this.store.select('profile', 'isGettingProfileSuccessful');

  constructor(
    private store: Store<{ auth: AuthState; profile: ProfileState }>,
  ) {}

  ngOnInit(): void {
    this.store.select('auth', 'isLoginSuccess').subscribe((isLoginSuccess) => {
      if (isLoginSuccess) {
        this.dialog.closeAll();
      }
    });
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40vw';
    dialogConfig.maxWidth = '80vw';
    dialogConfig.panelClass = 'custom-dialog-container';

    this.dialog.open(LoginComponent, dialogConfig);
  }
}
