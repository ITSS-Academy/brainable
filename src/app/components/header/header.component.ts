import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { authState } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
  dialog = inject(MatDialog);

  onMenuClick(): void {
    this.menuClick.emit();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40vw';
    dialogConfig.maxWidth = '80vw';
    dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
