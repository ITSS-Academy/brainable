import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [SharedModule, NgIf, NgForOf],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit {
  countdownNumbers = [3, 2, 1];
  activeNumber = 3;
  showFinalText = false;
  hideSquares = false;
  hiddenNumbers: Set<number> = new Set(); // Track hidden numbers

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    let index = 0;
    const countdownInterval = setInterval(() => {
      if (index > 0) {
        this.hiddenNumbers.add(this.countdownNumbers[index - 1]); // Hide the previous number
      }
      this.activeNumber = this.countdownNumbers[index];
      index++;

      if (index === this.countdownNumbers.length) {
        clearInterval(countdownInterval);
        setTimeout(() => {
          this.showFinalText = true;
          this.hideSquares = true; // Hide squares after countdown
        }, 1000);
      }
    }, 1000);
  }

  getClass(number: number): { [key: string]: boolean } {
    return {
      [`active-${number}`]: this.activeNumber === number,
      hidden: this.hideSquares || this.hiddenNumbers.has(number),
      active: this.activeNumber === number && !this.hiddenNumbers.has(number), // Add active class
    };
  }
}
