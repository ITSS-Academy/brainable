import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {SnackbarErrorComponent} from "../../components/snackbar-error/snackbar-error.component";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) {}

  showAlert(
    message: string,
    action: string,
    duration?: number,
    horizontalPosition?: MatSnackBarHorizontalPosition,
    verticalPosition?: MatSnackBarVerticalPosition,
  ) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: { message, action },
      duration: duration || 3000,
      horizontalPosition: horizontalPosition || 'end',
      verticalPosition: verticalPosition || 'top',
    });
  }

  showAlertError(
    message: string,
    action: string,
    duration?: number,
    horizontalPosition?: MatSnackBarHorizontalPosition,
    verticalPosition?: MatSnackBarVerticalPosition,
  ) {
    this._snackBar.openFromComponent(SnackbarErrorComponent, {
      data: { message, action },
      duration: duration || 3000,
      horizontalPosition: horizontalPosition || 'end',
      verticalPosition: verticalPosition || 'top',
      panelClass: ['alert-error'],
    });
  }
}
