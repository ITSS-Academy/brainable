import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { Question } from '../../../../../models/question.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [MaterialModule, SharedModule, NgIf],
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.scss',
})
export class QuizDetailComponent {
  @Input() showAnswer: boolean = false;
  @Input() question!: Question;
  @Input() index!: number;
}
