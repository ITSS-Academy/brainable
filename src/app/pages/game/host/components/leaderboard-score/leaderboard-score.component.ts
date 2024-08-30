import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';
import { Question } from '../../../../../models/question.model';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';

interface LeaderboardEntry {
  playerName: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard-score',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './leaderboard-score.component.html',
  styleUrl: './leaderboard-score.component.scss',
})
export class LeaderboardScoreComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  pin!: string;
  // result: {
  //   playerName: string;
  //   score: number;
  // }[] = [];
  // prevResult: {
  //   playerName: string;
  //   score: number;
  // }[] = [];

  result: LeaderboardEntry[] = [];
  prevResult: LeaderboardEntry[] = [];

  constructor(
    private store: Store<{ game: GameState; quiz: QuizState }>,
    private router: Router,
    private gameService: GameService,
  ) {
    this.subscription.push(
      this.store
        .select('game', 'pin')
        .subscribe((pin) => (this.pin = pin as string)),
    );
  }

  ngOnInit(): void {
    this.gameService.listenForTop5().subscribe((top5) => {
      this.result = top5;
    });
    this.subscription.push(
      this.store.select('game', 'previousResult').subscribe((prevResult) => {
        this.prevResult = prevResult as LeaderboardEntry[];
        console.log(this.prevResult);
      }),
    );
    this.createLeaderboard('rootElement');
    this.renderLeaderboard(this.prevResult);
    (async () => await this.updateLeaderboard(this.prevResult, this.result))();
    console.log('result: ', this.result);
  }

  nextClicked() {
    this.router.navigate([`/host/${this.pin}/question`]);
    this.gameService.nextQuestion(this.pin);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(
      GameActions.storePreviousResult({ previousResult: this.result }),
    );
  }

  @ViewChild('rootElement', { static: true }) rootElement!: ElementRef;

  leaderboardWidth = 300; // Example width
  leaderboardHeight = 200; // Example height
  rowWidth = 300; // Example row width
  rowHeight = 40; // Example row height

  createLeaderboard(rootElementId: string) {
    const root = this.rootElement.nativeElement;
    const leaderboardElement = document.createElement('div');
    leaderboardElement.style.width = `${this.leaderboardWidth}px`;
    leaderboardElement.style.height = `${this.leaderboardHeight}px`;
    leaderboardElement.style.overflow = 'hidden';
    leaderboardElement.style.position = 'relative';
    leaderboardElement.id = 'leaderboard';
    root.appendChild(leaderboardElement);
  }

  createRowElement(name: string, score: number, topPos: number) {
    const rowElement = document.createElement('div');
    rowElement.style.width = `${this.rowWidth}px`;
    rowElement.style.height = `${this.rowHeight}px`;
    rowElement.style.position = 'absolute';
    rowElement.style.border = '1px solid black';
    rowElement.style.display = 'flex';
    rowElement.style.justifyContent = 'space-between';
    rowElement.style.alignItems = 'center';
    rowElement.style.padding = '0 10px';
    rowElement.style.boxSizing = 'border-box';
    rowElement.style.top = `${topPos}px`;
    rowElement.style.transition = 'top 1s';
    rowElement.innerHTML = `<span>${name}</span><span>${score}</span>`;
    return rowElement;
  }

  renderLeaderboard(leaderboardRender: LeaderboardEntry[]) {
    const leaderboardElement = document.getElementById('leaderboard');
    if (leaderboardElement) {
      leaderboardElement.innerHTML = ''; // Clear any existing content

      for (let i = 0; i < leaderboardRender.length; i++) {
        const rowElement = this.createRowElement(
          leaderboardRender[i].playerName,
          leaderboardRender[i].score,
          i * this.rowHeight,
        );
        leaderboardElement.appendChild(rowElement);
      }
    }
  }

  // Function to calculate changes in rank and score
  private calcChange(
    prev: LeaderboardEntry[],
    current: LeaderboardEntry[],
  ): any[] {
    const changes = [];
    for (let i = 0; i < current.length; i++) {
      const prevRank = prev.findIndex(
        (item) => item.playerName === current[i].playerName,
      );
      changes.push({
        name: current[i].playerName,
        rankChange: prevRank - i,
        score: current[i].score,
        prevScore: prev[prevRank]?.score || 0, // Handle case where prevRank is -1
      });
    }
    return changes;
  }

  // // Async function to update the leaderboard with animations
  private async updateLeaderboard(
    prevLeaderboard: LeaderboardEntry[],
    leaderboard: LeaderboardEntry[],
  ): Promise<void> {
    const changes = this.calcChange(leaderboard, prevLeaderboard);
    console.log('change: ', changes); // Log changes for debugging
    console.log('prevLeaderboard: ', prevLeaderboard); // Log changes for debugging

    // Wait for 1 second before starting the animation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const leaderboardElement = document.getElementById('leaderboard');
    if (leaderboardElement) {
      const childrenArray = Array.from(leaderboardElement.children); // Convert HTMLCollection to Array
      let i = 0;
      for (const child of childrenArray) {
        if (child instanceof HTMLElement) {
          child.style.top = `${parseInt(child.style.top.replace('px', ''), 10) + changes[i]['rankChange'] * this.rowHeight}px`;
          i++;
        }
      }
    }
  }
}
