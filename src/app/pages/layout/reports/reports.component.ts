import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { clearStateReport } from '../../../ngrx/gameReport/gameReport.action';
import { Store } from '@ngrx/store';
import { GameReportState } from '../../../ngrx/gameReport/gameReport.state';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent{
  constructor(private store: Store<{ gameReport: GameReportState }>) {}
}
