import {
  AfterViewInit,
  Component,
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
import { Observable, Subscription } from 'rxjs';
import { GameReportState } from '../../../../../ngrx/gameReport/gameReport.state';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import * as GameReportActions from '../../../../../ngrx/gameReport/gameReport.action';
import { GameReport } from '../../../../../models/gameReport.model';
import { DatePipe, SlicePipe } from '@angular/common';
import { clearStateReport } from '../../../../../ngrx/gameReport/gameReport.action';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [MaterialModule, SharedModule, DatePipe, SlicePipe],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss',
})
export class ReportListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['No.', 'name', 'joinCode', 'createdAt'];
  gameReports$: Observable<GameReport[]> = this.store.select(
    'gameReport',
    'gameReports',
  );

  dataSource!: MatTableDataSource<GameReport>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subscriptions: Subscription[] = [];

  constructor(
    private route: Router,
    private store: Store<{ auth: AuthState; gameReport: GameReportState }>,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken) {
          this.store.dispatch(GameReportActions.getAllGameReports({ idToken }));

          this.gameReports$.subscribe((gameReports) => {
            if (gameReports) {
              const users = Array.from({ length: gameReports.length }, (_, k) =>
                this.createNewReport(gameReports[k], k + 1),
              );
              this.dataSource = new MatTableDataSource(users);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              // this.paginator.page.subscribe(() => {});
              if (this.sort) {
                this.sort.sortChange.subscribe((sortState: Sort) => {
                  this.customSort(sortState);
                });
              }
              // console.log(users);
            }
          });
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearStateReport());
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {});
    this.sort.sortChange.subscribe((sortState: Sort) => {
      this.customSort(sortState);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewReport(report: GameReport, index: number): GameReport {
    return {
      ...report,
      index: index,
    };
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
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'name':
          return this.compare(a.quizId.title, b.quizId.title, isAsc);
        case 'joinCode':
          return this.compare(a.joinCode, b.joinCode, isAsc);
        case 'createdAt':
          return this.compare(
            a.createdAt.getMilliseconds(),
            b.createdAt.getMilliseconds(),
            isAsc,
          );
        default:
          return 0;
      }
    });
  }

  compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onRowClicked(row: any) {
    this.route.navigate([`/reports/${row.id}`]);
  }
}
