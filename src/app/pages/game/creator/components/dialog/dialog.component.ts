import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {}
