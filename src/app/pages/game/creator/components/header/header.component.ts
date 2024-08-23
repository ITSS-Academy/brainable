import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import { Quiz, QuizDTO } from '../../../../../models/quiz.model';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { idToken } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Untitled Quiz';
  subscription: Subscription[] = [];
  quiz!: Quiz;
  idToken!: string;

  constructor(
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        this.idToken = idToken;
      }),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.quiz = quiz;
      }),
      this.store
        .select('quiz', 'isUpdateQuizSuccessful')
        .subscribe((isUpdateQuizSuccessful) => {
          if (isUpdateQuizSuccessful) {
            this.router.navigate(['/library']);
          }
        }),
    );
  }

  saveQuiz() {
    const quizUpdate: QuizDTO = {
      quiz: this.quiz,
    };
    this.store.dispatch(
      QuizActions.updateQuiz({ idToken: this.idToken, quiz: quizUpdate }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
