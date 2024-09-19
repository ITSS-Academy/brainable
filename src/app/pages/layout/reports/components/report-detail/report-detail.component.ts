import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { PlayersComponent } from '../players/players.component';
import { QuestionsComponent } from '../questions/questions.component';
import { OverviewReportComponent } from './components/overview-report/overview-report.component';
import { Store } from '@ngrx/store';
import { GameReportState } from '../../../../../ngrx/gameReport/gameReport.state';
import { GameReport } from '../../../../../models/gameReport.model';
import * as GameReportActions from '../../../../../ngrx/gameReport/gameReport.action';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { PlayerRecord } from '../../../../../models/playerRecord.model';
import { clearStateReport } from '../../../../../ngrx/gameReport/gameReport.action';

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    PlayersComponent,
    QuestionsComponent,
    OverviewReportComponent,
  ],
  templateUrl: './report-detail.component.html',
  styleUrl: './report-detail.component.scss',
})
export class ReportDetailComponent implements OnInit{
  gameReport$ = this.store.select('gameReport');
  currentReport!: GameReport;
  gameRecords!: PlayerRecord[] | undefined;
  isChecked = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ auth: AuthState; gameReport: GameReportState }>,
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.store.select('auth', 'idToken').subscribe((idToken) => {
      if (idToken) {
        this.store.dispatch(
          GameReportActions.getGameReport({ idToken, gameId: id }),
        );
      }
    });
  }

  // ngOnDestroy(): void {
  //   this.store.dispatch(clearStateReport());
  // }
}
