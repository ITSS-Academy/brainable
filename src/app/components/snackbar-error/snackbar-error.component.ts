import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";
import {MaterialModule} from "../../shared/modules/material.module";
import {SnackbarComponent} from "../snackbar/snackbar.component";

@Component({
  selector: 'app-snackbar-error',
  standalone: true,
    imports: [
      MaterialModule,
        MatButton,
        MatSnackBarAction,
        MatSnackBarActions,
        MatSnackBarLabel
    ],
  templateUrl: './snackbar-error.component.html',
  styleUrl: './snackbar-error.component.scss'
})
export class SnackbarErrorComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {}
}
