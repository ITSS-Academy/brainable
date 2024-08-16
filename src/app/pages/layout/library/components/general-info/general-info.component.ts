import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { Quiz } from '../../../../../models/quiz.model';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent {
  @Input() quiz!: Quiz;
  showAnswer = false;

  constructor() {}

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
