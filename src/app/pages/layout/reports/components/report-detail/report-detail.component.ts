import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { PlayersComponent } from '../players/players.component';
import { QuestionsComponent } from '../questions/questions.component';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    PlayersComponent,
    QuestionsComponent,
    OverviewComponent,
  ],
  templateUrl: './report-detail.component.html',
  styleUrl: './report-detail.component.scss',
})
export class ReportDetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const reportId = this.activatedRoute.snapshot.params;
  }
}
