import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz } from '../../../models/quiz.model';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../services/question/question.service';
import { QuestionChannel } from '../../../models/question.model';
import {LobbyComponent} from "./components/lobby/lobby.component";
import {AnswerComponent} from "./components/answer/answer.component";

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [MaterialModule, FormsModule, LobbyComponent, AnswerComponent],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss',
})
export class HostComponent implements OnInit {
  constructor(
    private store: Store<{ quiz: QuizState; auth: AuthState }>,
    private questionService: QuestionService,
  ) {}

  subscriptions: Subscription[] = [];
  quiz$ = this.store.select('quiz', 'getQuiz');
  isGettingQuiz$ = this.store.select('quiz', 'isGetQuizSuccessful');

  quiz: Quiz[] = [];
  pin = '';

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((token) => {
        if (token) {
          this.store.dispatch(QuizActions.getQuiz({ idToken: token }));
        }
      }),
      this.isGettingQuiz$.subscribe((isGettingQuiz) => {
        if (isGettingQuiz) {
          this.quiz$.subscribe((quiz) => {
            if (quiz) {
              this.quiz = quiz;
              console.log('Quiz:', quiz[0].questions);
            }
          });
        }
      }),
    );
  }

  sendQuestion() {
    const question = this.quiz[0].questions[0];
    const questionChannel: QuestionChannel = {
      pin: this.pin,
      question: question.question,
      answer: question.answer,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      timeLimit: question.timeLimit,
      quizId: this.quiz[0].id,
    };
    this.questionService.sendQuestionByPin(questionChannel);
  }
}
