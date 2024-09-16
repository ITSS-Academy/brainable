import {Component, Input, OnDestroy} from '@angular/core';
import { MaterialModule } from '../../../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { QuestionRecord } from '../../../../../../../models/questionRecord.model';
import { GameReportState } from '../../../../../../../ngrx/gameReport/gameReport.state';
import { Store } from '@ngrx/store';
import {clearStateReport} from "../../../../../../../ngrx/gameReport/gameReport.action";

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss',
})
export class QuizResultComponent {
  gameReport$ = this.store.select('gameReport', 'gameReport');

  constructor(private store: Store<{ gameReport: GameReportState }>) {}

  @Input() questionRecord!: QuestionRecord;

  calculatePercentage(numAns: number, totalPlayer: Array<any>): number {
    return (numAns / totalPlayer.length) * 100;
  }
}
