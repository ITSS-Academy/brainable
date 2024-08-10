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

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss',
})
export class HostComponent implements OnInit {
  private quizzes: any;
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
              // console.log('Quiz:', quiz[0].questions);
            }
          });
        }
      }),
    );
  }

  sendQuestion() {
    if (this.quizzes.length > 0 && this.quizzes[0].questions.length > 0) {
      const question = this.quizzes[0].questions[0];
      const questionChannel: QuestionChannel = {
        pin: this.pin,
        question: question.text, // Chỉnh sửa để phù hợp với thuộc tính đúng
        answer: question.answer ?? '',
        option1: question.option1 ?? '',
        option2: question.option2 ?? '',
        option3: question.option3 ?? '',
        option4: question.option4 ?? '',
        timeLimit: question.timeLimit ?? 0,
        quizId: this.quizzes[0].id,
      };
      this.questionService.sendQuestionByPin(questionChannel);
    } else {
      console.error('No questions available.');
    }
  }
}
