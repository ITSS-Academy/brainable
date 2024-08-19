import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() showAnswer = new EventEmitter<boolean>();
  showAnsStatus = false;

  constructor() {}

  toggleAnswer() {
    this.showAnsStatus = !this.showAnsStatus;
    this.showAnswer.emit(this.showAnsStatus);
  }
}
