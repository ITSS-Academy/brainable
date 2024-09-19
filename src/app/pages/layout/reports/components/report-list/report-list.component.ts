import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MaterialModule} from '../../../../../shared/modules/material.module';
import {SharedModule} from '../../../../../shared/modules/shared.module';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {GameReportState} from '../../../../../ngrx/gameReport/gameReport.state';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../../ngrx/auth/auth.state';
import * as GameReportActions from '../../../../../ngrx/gameReport/gameReport.action';
import {clearStateReport} from '../../../../../ngrx/gameReport/gameReport.action';
import {GameReport} from '../../../../../models/gameReport.model';
import {DatePipe, NgForOf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [MaterialModule, SharedModule, DatePipe, SlicePipe, NgForOf],
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
  page: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subscriptions: Subscription[] = [];

  constructor(
    private route: Router,
    private store: Store<{ auth: AuthState; gameReport: GameReportState }>,
    private cdr: ChangeDetectorRef,
  ) {}

  start = 0;
  end = 5;

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
              this.dataSource.filterPredicate = (data: GameReport, filter: string) => {
                return data.quizId.title.toLowerCase().includes(filter) || data.joinCode.toLowerCase().includes(filter);
              };
              //this.updatePaginatedData();
              if (this.sort) {
                this.sort.sortChange.subscribe((sortState: Sort) => {
                  this.customSort(sortState);
                });
              }
            }
          });
        }
      }),
    );
    this.setupDataSource();
  }

  setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.filteredReports());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filteredReports(): GameReport[] {
    return this.dataSource.filteredData;
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex + 1; // Update current page
    this.cdr.detectChanges();
  }

  paginatedReports(): GameReport[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    return this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(clearStateReport());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {});
    this.sort.sortChange.subscribe((sortState: Sort) => {
      this.customSort(sortState);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.cdr.detectChanges();
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

  handlePageEvent(event: PageEvent) {
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
