import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuestionState } from '../../../ngrx/question/question.state';
import { Subscription } from 'rxjs';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question/question.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import {WaitingComponent} from "./components/waiting/waiting.component";
import {AnswerComponent} from "./components/answer/answer.component";
import {ResultComponent} from "./components/result/result.component";

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [FormsModule, MaterialModule, WaitingComponent, AnswerComponent, ResultComponent],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent implements OnInit {
  constructor(
    private store: Store<{ question: QuestionState; auth: AuthState }>,
    private questionService: QuestionService,
  ) {}

  subscriptions: Subscription[] = [];
  questions$ = this.store.select('question', 'getQuestions');
  question!: Question;
  pin = '';

  ngOnInit(): void {
    this.subscriptions.push(
      this.questions$.subscribe((questions) => {
        if (questions) {
          this.question = questions;
          console.log('Questions:', questions);
        }
      }),
    );
  }

  joinGame(pin: string) {
    console.log('Joining game:', pin);
    this.questions$ = this.questionService.getQuestionByPin(pin);
    this.questions$.subscribe((question) => {
      console.log('Question:', question);
    });
  }
}
