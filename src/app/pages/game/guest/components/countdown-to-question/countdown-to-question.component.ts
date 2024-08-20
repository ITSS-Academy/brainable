import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-countdown-to-question',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './countdown-to-question.component.html',
  styleUrl: './countdown-to-question.component.scss'
})
export class CountdownToQuestionComponent implements OnInit {
  countdownNumbers = [3, 2, 1];
  activeNumber = 3;
  showFinalText = false;
  countdownInterval: any;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    let index = 0;
    const countdownDuration = 1000; // 1 second per countdown

    this.countdownInterval = setInterval(() => {
      if (index > 0) {
        this.activeNumber = this.countdownNumbers[index];
        index++;
      }

      if (index === this.countdownNumbers.length) {
        clearInterval(this.countdownInterval);
        setTimeout(() => {
          this.showFinalText = true;
        }, countdownDuration);
      }
    }, countdownDuration);

    // Start progress animation
    document.querySelector('.countdown-circle')?.classList.add('active');
  }
}
