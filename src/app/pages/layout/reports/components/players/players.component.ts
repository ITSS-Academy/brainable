import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GameReport } from '../../../../../models/gameReport.model';
import { PlayerRecord } from '../../../../../models/playerRecord.model';
import { GameReportState } from '../../../../../ngrx/gameReport/gameReport.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { clearStateReport } from '../../../../../ngrx/gameReport/gameReport.action';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'name',
    'question-correct',
    'question-incorrect',
    'no-answer',
    'accuracy',
    'score',
  ];

  @Input() gameRecord!: PlayerRecord[] | undefined | null;
  dataSource!: MatTableDataSource<PlayerRecord>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  gameReport$: Observable<GameReport | null> = this.store.select(
    'gameReport',
    'gameReport',
  );

  constructor(
    private route: Router,
    private store: Store<{ gameReport: GameReportState }>,
  ) {}

  ngOnInit(): void {
    this.gameReport$.subscribe((gameReport) => {
      if (gameReport) {
        this.dataSource = new MatTableDataSource(gameReport.gameRecords);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator.page.subscribe(() => {});
        this.sort.sortChange.subscribe((sortState: Sort) => {
          this.customSort(sortState);
        });
      }
    });
  }

  calculatePercentage(num1: number, total: number): string {
    return ((num1 / total) * 100).toFixed(0) + '%';
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customSort(sortState: Sort) {
    const data = this.dataSource.data.slice();
    if (!sortState.active || sortState.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sortState.direction === 'asc';
      switch (sortState.active) {
        case 'name':
          return this.compare(a.playerName, b.playerName, isAsc);
        case 'question-correct':
          return this.compare(a.correctCount, b.correctCount, isAsc);
        case 'question-incorrect':
          return this.compare(a.incorrectCount, b.incorrectCount, isAsc);
        case 'no-answer':
          return this.compare(a.noAnswerCount, b.noAnswerCount, isAsc);
        case 'score':
          return this.compare(a.score, b.score, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
