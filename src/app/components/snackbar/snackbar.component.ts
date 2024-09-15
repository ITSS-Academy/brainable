import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef} from "@angular/material/snack-bar";
import {MaterialModule} from "../../shared/modules/material.module";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    MaterialModule,
    MatSnackBarActions,
    MatSnackBarLabel
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {}

}
