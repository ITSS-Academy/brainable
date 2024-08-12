import { Component } from '@angular/core';
import {QuestionCardComponent} from "./components/question-card/question-card.component";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    QuestionCardComponent
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {

}
