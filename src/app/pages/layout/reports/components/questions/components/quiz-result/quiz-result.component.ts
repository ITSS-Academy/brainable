import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss',
})
export class QuizResultComponent {}
