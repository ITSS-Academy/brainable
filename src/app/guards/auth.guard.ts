import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';

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
          router.navigate(['/home']).then((r) => {
            console.log('[Library] user is not signed in');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.width = '40vw';
            dialogConfig.maxWidth = '80vw';
            dialogConfig.panelClass = 'custom-dialog-container';
            dialog.open(LoginComponent, dialogConfig);
          });
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
          router.navigate(['/home']).then((r) => {
            console.log('[Reports] user is not signed in');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.width = '40vw';
            dialogConfig.maxWidth = '80vw';
            dialogConfig.panelClass = 'custom-dialog-container';
            dialog.open(LoginComponent, dialogConfig);
          });
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
          router.navigate(['/home']).then((r) => {
            console.log('[Create] user is not signed in');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.width = '40vw';
            dialogConfig.maxWidth = '80vw';
            dialogConfig.panelClass = 'custom-dialog-container';
            dialog.open(LoginComponent, dialogConfig);
          });
          return false;
        }
      }),
    );
};