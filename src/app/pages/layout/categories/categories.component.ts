import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { CategoriesState } from '../../../ngrx/categories/categories.state';
import { Subscription } from 'rxjs';
import * as CategoriesActions from '../../../ngrx/categories/categories.actions';
import { Categories, CategoriesByUid } from '../../../models/categories.model';
import { LoadingComponent } from '../../loading/loading.component';
import { GeneralInfoComponent } from '../library/components/general-info/general-info.component';
import { ProfileInfoComponent } from '../library/components/profile-info/profile-info.component';
import { QuizDetailComponent } from '../quiz/components/quiz-detail/quiz-detail.component';
import { Quiz } from '../../../models/quiz.model';
import { NgIf } from '@angular/common';
import { getAllCategories } from '../../../ngrx/categories/categories.actions';
import { Question } from '../../../models/question.model';
import * as GameActions from '../../../ngrx/game/game.actions';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { GameReport } from '../../../models/gameReport.model';
import * as GameReportActions from '../../../ngrx/gameReport/gameReport.action';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { GameState } from '../../../ngrx/game/game.state';
import { GameReportState } from '../../../ngrx/gameReport/gameReport.state';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    LoadingComponent,
    GeneralInfoComponent,
    ProfileInfoComponent,
    QuizDetailComponent,
    NgIf,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  categoryId!: string;
  quizzes!: Quiz[];
  category!: CategoriesByUid;
  questions!: Question[];
  idToken!: string;

  showAnswer: boolean = false;

  isGettingCategorySuccess$ = this.store.select(
    'categories',
    'isGetCategorySuccessful',
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{
      categories: CategoriesState;
      quiz: QuizState;
      auth: AuthState;
      game: GameState;
      gameReport: GameReportState;
    }>,
    private gameService: GameService,
  ) {
    this.categoryId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('categories', 'category').subscribe((data) => {
        this.category = data as CategoriesByUid;
        this.quizzes = data.quizzes as Quiz[];
        if (this.quizzes) {
          this.questions = this.quizzes[0].questions;
        }
      }),
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken) {
          this.idToken = idToken;
        }
      }),
    );
    this.store.dispatch(
      CategoriesActions.getCategoryById({ uid: this.categoryId }),
    );
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  activeQuiz(index: number): void {
    this.questions = this.quizzes[index].questions;
  }

  playGame(quiz: Quiz) {
    const pin = this.generatePin();
    this.store.dispatch(GameActions.storePin({ pin }));
    this.store.dispatch(QuizActions.storeCurrentQuiz({ quiz: quiz }));
    this.store.dispatch(
      GameActions.storeTotalQuestions({
        totalQuestions: quiz.questions.length,
      }),
    );

    this.gameService.createRoom(pin);
    this.router.navigate([`/host/${pin}/lobby`]);

    let newGame: GameReport = {
      id: '',
      quizId: quiz,
      createdAt: new Date(),
      gameRecords: [],
      hostId: '',
      index: 0,
      joinCode: pin,
      totalQuestions: 0,
    };
    this.store.dispatch(
      GameReportActions.createGameReport({
        idToken: this.idToken,
        gameReport: newGame,
      }),
    );
  }

  generatePin(): string {
    let pin = '';
    for (let i = 0; i < 6; i++) {
      pin += Math.floor(Math.random() * 10).toString();
    }
    return pin;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
