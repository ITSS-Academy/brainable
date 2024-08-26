import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { QuizDetailComponent } from './components/quiz-detail/quiz-detail.component';
import {
  CdkFixedSizeVirtualScroll,
  ScrollingModule,
} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    QuizDetailComponent,
    ScrollingModule,
    CdkFixedSizeVirtualScroll,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  showAnswer: boolean = false;

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
