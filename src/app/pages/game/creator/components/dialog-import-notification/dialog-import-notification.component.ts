import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-dialog-import-notification',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgForOf,
  ],
  templateUrl: './dialog-import-notification.component.html',
  styleUrl: './dialog-import-notification.component.scss',
})
export class DialogImportNotificationComponent {
  missingFields: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.missingFields = data.missingFields;
  }
}
