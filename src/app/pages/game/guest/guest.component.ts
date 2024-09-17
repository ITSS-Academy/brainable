import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuestionState } from '../../../ngrx/question/question.state';
import { Subscription } from 'rxjs';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question/question.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { WaitingComponent } from './components/waiting/waiting.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ResultComponent } from './components/result/result.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { GameService } from '../../../services/game/game.service';
import { GameState } from '../../../ngrx/game/game.state';
import * as GameActions from '../../../ngrx/game/game.actions';
import { CountdownToQuestionComponent } from './components/countdown-to-question/countdown-to-question.component';
import { HostLeftSnackbarComponent } from './components/host-left-snackbar/host-left-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackgroundImgState } from '../../../ngrx/background-img/background-img.state';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule,
    WaitingComponent,
    AnswerComponent,
    ResultComponent,
    CountdownToQuestionComponent,
    RouterOutlet,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      question: QuestionState;
      auth: AuthState;
      game: GameState;
      background: BackgroundImgState;
    }>,
    private gameService: GameService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.backgroundImg$.subscribe((img) => {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.container'),
        'background-image',
        `url(${img})`,
      );
    });

    this.gameService.listenForErrors().subscribe((error) => {
      console.log(error);
      if (error === 'Host has left the game') {
        this.openSnackBar();

        setTimeout(() => {
          this._snackBar.dismiss();
        }, 2000);
        this.router.navigate(['/join']);
      }
    });
    const pin = this.activatedRoute.snapshot.paramMap.get('pin');
    this.store.dispatch(GameActions.storePin({ pin: pin }));
    // this.openSnackBar();
  }

  backgroundImg$ = this.store.select('background', 'img');
  //   Snackbar handle
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(HostLeftSnackbarComponent, {
      // duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
