import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogConfig } from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {authState} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80vw';
    dialogConfig.maxWidth = '90vw';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      authState: authState,
    };


    const dialogRef = this.dialog.open(DialogContentExampleDialog, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
  styleUrls: ['./dialog-content-example.scss'], // Add this line
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatLabel, MatFormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  protected readonly authState = authState;
}
