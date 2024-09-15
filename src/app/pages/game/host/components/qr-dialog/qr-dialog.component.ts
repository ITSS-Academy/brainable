import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-qr-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    QRCodeModule,
  ],
  templateUrl: './qr-dialog.component.html',
  styleUrl: './qr-dialog.component.scss',
})
export class QrDialogComponent {
  qrCodeValue: string = '';
  pin: string = '';

  constructor(
    private store: Store<{ game: GameState }>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.store.select('game', 'pin').subscribe((pin) => {
      if (pin) {
        this.pin = pin as string;
        this.qrCodeValue = `https://brainable.io.vn/guest/${this.pin}/waiting`;
      }
    });
  }
}
