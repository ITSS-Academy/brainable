import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-countdown-to-question',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    NgIf,
    NgClass
  ],
  templateUrl: './countdown-to-question.component.html',
  styleUrl: './countdown-to-question.component.scss'
})
export class CountdownToQuestionComponent implements OnInit {
  countdownNumbers = [3, 2, 1];
  activeNumber = 4;
  showFinalText = false;
  hideCircle = false;
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
          this.hideCircle = true; // Hide squares after countdown
        }, 1000);
      }
    }, 1000);
  }
}
