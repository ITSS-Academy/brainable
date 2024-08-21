import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {
  progressValue = 0;

  private duration = 4000; // Duration of the animation in milliseconds
  private interval = 50; // Interval between updates in milliseconds

  ngOnInit() {
    this.animateProgress();
  }

  animateProgress() {
    const increment = (100 / (this.duration / this.interval)); // Calculate increment value

    const intervalId = setInterval(() => {
      if (this.progressValue + increment >= 100) {
        this.progressValue = 100; // Ensure we reach exactly 100%
        clearInterval(intervalId); // Stop the interval when progress reaches 100%
      } else {
        this.progressValue += increment; // Update progress value
      }
    }, this.interval);
  }
}
