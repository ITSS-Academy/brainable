import { Component } from '@angular/core';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import {
  CdkFixedSizeVirtualScroll,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { QuizDetailComponent } from '../quiz/components/quiz-detail/quiz-detail.component';
import { MaterialModule } from '../../../shared/modules/material.module';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    MaterialModule,
    GeneralInfoComponent,
    ProfileInfoComponent,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
    QuizDetailComponent,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent {
  showAnswer = false;

  constructor() {}

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
