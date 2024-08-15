import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import {ComponentType} from "@angular/cdk/overlay";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private dialog: MatDialog) {
  }

}
