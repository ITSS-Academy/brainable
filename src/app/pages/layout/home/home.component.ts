import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { LocalTimePipe } from '../../../shared/pipes/local-time.pipe';
import { CardQuizComponent } from './components/card-quiz/card-quiz.component';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, FormsModule, LocalTimePipe, CardQuizComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  quizzes = Array(5).fill({
    title: 'Title Here',
    questions: '123 question',
    plays: '321 plays',
    imageUrl: '../assets/images/media.png'
  });
}
