import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { Store } from '@ngrx/store';
import { GameState } from '../ngrx/game/game.state';

export const canActivateLibrary: CanActivateFn = () => {
  const router = inject(Router);
  const dialog = inject(MatDialog);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          return true;
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '40vw';
          dialogConfig.maxWidth = '80vw';
          dialogConfig.panelClass = 'custom-dialog-container';
          dialog.open(LoginComponent, dialogConfig);
          return false;
        }
      }),
    );
};

export const canActivateReports: CanActivateFn = () => {
  const router = inject(Router);
  const dialog = inject(MatDialog);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          return true;
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '40vw';
          dialogConfig.maxWidth = '80vw';
          dialogConfig.panelClass = 'custom-dialog-container';
          dialog.open(LoginComponent, dialogConfig);

          return false;
        }
      }),
    );
};

export const canActivateCreate: CanActivateFn = () => {
  const router = inject(Router);
  const dialog = inject(MatDialog);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          return true;
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '40vw';
          dialogConfig.maxWidth = '80vw';
          dialogConfig.panelClass = 'custom-dialog-container';
          dialog.open(LoginComponent, dialogConfig);
          return false;
        }
      }),
    );
};

export const canActiveHost: CanActivateFn = () => {
  const router = inject(Router);
  const dialog = inject(MatDialog);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          return true;
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '40vw';
          dialogConfig.maxWidth = '80vw';
          dialogConfig.panelClass = 'custom-dialog-container';
          dialog.open(LoginComponent, dialogConfig);

          return false;
        }
      }),
    );
};

export const canActiveGame: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<{ game: GameState }>);
  return store.select('game', 'pin').pipe(
    map((pin) => {
      if (pin) {
        return true;
      } else {
        router.navigate(['/join']);
        return false;
      }
    }),
  );
};

export class authGuard {}
