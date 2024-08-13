import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { MatSlider } from '@angular/material/slider';
import { NgIf } from '@angular/common';
import { QuizResultComponent } from '../quiz-result/quiz-result.component';
import { AnswerStatusBarComponent } from '../answer-status-bar/answer-status-bar.component';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    MatSlider,
    NgIf,
    QuizResultComponent,
    AnswerStatusBarComponent,
  ],
  templateUrl: './question-card.component.html', // Corrected to a string
  styleUrls: ['./question-card.component.scss'], // Ensure this is plural and correct
})
export class QuestionCardComponent {
  value: number = 76;
  mode: 'determinate' | 'indeterminate' = 'determinate';

  constructor() {}
}
