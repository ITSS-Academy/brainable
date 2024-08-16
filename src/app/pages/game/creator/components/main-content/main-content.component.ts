import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  questionInput: string = '';
  charCountQuestion: number = 120;

  answerInput1: string = '';
  answerInput2: string = '';
  answerInput3: string = '';
  answerInput4: string = '';

  charCountAnswer1: number = 75;
  charCountAnswer2: number = 75;
  charCountAnswer3: number = 75;
  charCountAnswer4: number = 75;

  updateCharCountQuestion(): void {
    this.charCountQuestion = 120 - this.questionInput.length;
  }

  updateCharCountAnswer(index: number): void {
    switch (index) {
      case 1:
        this.charCountAnswer1 = 75 - this.answerInput1.length;
        break;
      case 2:
        this.charCountAnswer2 = 75 - this.answerInput2.length;
        break;
      case 3:
        this.charCountAnswer3 = 75 - this.answerInput3.length;
        break;
      case 4:
        this.charCountAnswer4 = 75 - this.answerInput4.length;
        break;
    }
  }
}
