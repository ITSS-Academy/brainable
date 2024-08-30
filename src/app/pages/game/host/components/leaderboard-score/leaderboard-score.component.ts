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
      console.log('result: ', this.result);
      this.createLeaderboard('rootElement');
      this.renderLeaderboard(this.prevResult, this.result);
      (async () =>
        await this.updateLeaderboard(this.prevResult, this.result))();
    });
    this.subscription.push(
      this.store.select('game', 'previousResult').subscribe((prevResult) => {
        this.prevResult = prevResult as LeaderboardEntry[];
        console.log(this.prevResult);
      }),
    );
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

  leaderboardWidth = 500; // Example width
  leaderboardHeight = 310; // Example height
  rowWidth = 500; // Example row width
  rowHeight = 50; // Example row height

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
    rowElement.style.backgroundColor = 'white';
    rowElement.style.borderRadius = '8px';
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

  renderLeaderboard(
    leaderboardRender: LeaderboardEntry[],
    currentLeaderboard?: LeaderboardEntry[],
  ) {
    const leaderboardElement = document.getElementById('leaderboard');
    if (leaderboardElement) {
      leaderboardElement.innerHTML = ''; // Clear any existing content
      if (currentLeaderboard) {
        for (let i = 0; i < leaderboardRender.length; i++) {
          const rowElement = this.createRowElement(
            leaderboardRender[i].playerName,
            currentLeaderboard[
              currentLeaderboard.findIndex(
                (item) => item.playerName === leaderboardRender[i].playerName,
              )
            ].score,
            i * 62,
          );
          leaderboardElement.appendChild(rowElement);
        }
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

  async updateLeaderboard(
    prevLeaderboard: LeaderboardEntry[] | undefined,
    leaderboard: LeaderboardEntry[],
  ): Promise<void> {
    if (!prevLeaderboard || prevLeaderboard.length === 0) {
      this.renderLeaderboard(leaderboard, leaderboard);
      return;
    }

    const changes = this.calcChange(prevLeaderboard, leaderboard);
    console.log('changes: ', changes); // Log changes for debugging

    // Wait for 1 second before starting the animation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const leaderboardElement = document.getElementById('leaderboard');
    if (leaderboardElement) {
      const childrenArray = Array.from(
        leaderboardElement.children,
      ) as HTMLElement[];

      if (childrenArray.length !== changes.length) {
        console.error(
          'Mismatch between number of rows and changes. Check data consistency.',
        );
        return;
      }

      // Clear any existing styles to avoid cumulative effects
      childrenArray.forEach((child) => {
        child.style.transition = 'none'; // Disable transition temporarily
        child.style.top = ''; // Reset top position
      });

      // Apply new styles
      childrenArray.forEach((child, index) => {
        const change = changes[index];
        if (change) {
          // Set initial top position if not already set
          if (child.style.top === '') {
            child.style.top = `${index * 62}px`;
          }

          // Debug output for each row being updated
          console.log(`Updating row ${index}:`, change);

          // Update position based on rankChange
          const currentTop = parseInt(child.style.top.replace('px', ''), 10);
          child.style.transition = 'top 1s'; // Re-enable transition
          child.style.top = `${currentTop + change.rankChange * 62}px`;
        }
      });
    }
  }
}
