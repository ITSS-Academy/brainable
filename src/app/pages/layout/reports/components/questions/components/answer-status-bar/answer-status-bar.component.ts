import { Component } from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-answer-status-bar',
  standalone: true,
  imports: [MatProgressBar],
  templateUrl: './answer-status-bar.component.html',
  styleUrl: './answer-status-bar.component.scss',
})
export class AnswerStatusBarComponent {}
