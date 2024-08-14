import { Component } from '@angular/core';
import {QuestionCardComponent} from "./components/question-card/question-card.component";
import {LoginComponent} from "./components/login/login.component";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    QuestionCardComponent,
    LoginComponent
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {

}
