import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { Quiz } from '../../../../../models/quiz.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { GameState } from '../../../../../ngrx/game/game.state';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { GameService } from '../../../../../services/game/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  @Input() quiz!: Quiz;
  @Output() showAnswer = new EventEmitter<boolean>();
  showAnsStatus = false;
  idToken!: string;
  subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{ quiz: QuizState; auth: AuthState; game: GameState }>,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    this.subscription.push(
      this.store.select('auth').subscribe((authState) => {
        this.idToken = authState.idToken;
      }),
      this.store
        .select('quiz', 'isDeleteQuizSuccessful')
        .subscribe((isDeleteQuizSuccessful) => {
          if (isDeleteQuizSuccessful) {
            this.store.dispatch(QuizActions.clearQuizState());
            this.store.dispatch(
              QuizActions.getAllQuiz({ idToken: this.idToken }),
            );
          }
        }),
    );
  }

  toggleAnswer() {
    this.showAnsStatus = !this.showAnsStatus;
    this.showAnswer.emit(this.showAnsStatus);
  }

  playGame() {
    const pin = this.generatePin();
    this.store.dispatch(GameActions.storePin({ pin }));
    this.store.dispatch(QuizActions.storeCurrentQuiz({ quiz: this.quiz }));
    this.gameService.createRoom(pin);
    this.router.navigate([`/host/${pin}/lobby`]);
  }

  generatePin(): string {
    let pin = '';
    for (let i = 0; i < 6; i++) {
      pin += Math.floor(Math.random() * 10).toString();
    }
    return pin;
  }

  editQuiz() {
    this.router.navigate([`/creator/${this.quiz.id}`]);
  }

  deleteQuiz() {
    this.store.dispatch(
      QuizActions.deleteQuiz({ idToken: this.idToken, id: this.quiz.id }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
