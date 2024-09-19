import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { QuestionRecord } from '../../../../../../../models/questionRecord.model';
import {clearStateReport} from "../../../../../../../ngrx/gameReport/gameReport.action";
import {Store} from "@ngrx/store";
import {GameReportState} from "../../../../../../../ngrx/gameReport/gameReport.state";
import { clearStateQuestionRecord } from "../../../../../../../ngrx/questionRecord/questionRecord.actions";


@Component({
  selector: 'app-answer-status-bar',
  standalone: true,
  imports: [MatProgressBar],
  templateUrl: './answer-status-bar.component.html',
  styleUrl: './answer-status-bar.component.scss',
})
export class AnswerStatusBarComponent implements OnInit, OnDestroy {
  @Input() questionRecord!: QuestionRecord;

  inCorrectCount: number = 0;
  correctCount: number = 0;
  totalCount: number = 0;

  constructor(
    private store: Store<{ gameReport: GameReportState }>,
  ) {}

  ngOnInit(): void {
    const correctAnswer = this.questionRecord.question.answer;
    const { countA, countB, countC, countD } = this.questionRecord;

    let correctCount = 0;
    if (correctAnswer === 1) {
      correctCount = countA;
    } else if (correctAnswer === 2) {
      correctCount = countB;
    } else if (correctAnswer === 3) {
      correctCount = countC;
    } else if (correctAnswer === 4) {
      correctCount = countD;
    }

    this.correctCount = correctCount;
    this.inCorrectCount = countA + countB + countC + countD - correctCount;
    this.totalCount = countA + countB + countC + countD;
  }

  calculatePercentage(numAns: number, totalPlayer: number): number {
    return (numAns / totalPlayer) * 100;
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearStateQuestionRecord());
  }
}
