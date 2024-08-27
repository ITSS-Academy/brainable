import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-left-snackbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './host-left-snackbar.component.html',
  styleUrl: './host-left-snackbar.component.scss',
})
export class HostLeftSnackbarComponent {
  constructor(private router: Router) {}

  snackBarRef = inject(MatSnackBarRef);

  navigateToHome() {
    this.router.navigate(['/home']);
    this.snackBarRef.dismiss();
  }
}
