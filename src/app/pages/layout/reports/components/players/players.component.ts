import {
  AfterViewInit,
  Component,
  Input,
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
import { GameRecord } from '../../../../../models/gameRecord.model';
import { GameReportState } from '../../../../../ngrx/gameReport/gameReport.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface UserData {
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

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

  @Input() gameRecord!: GameRecord[] | undefined | null;
  dataSource!: MatTableDataSource<GameRecord>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  gameReport$: Observable<GameReport | null> = this.store.select('gameReport', 'gameReport');

  constructor(private route: Router,
    private store: Store<{gameReport: GameReportState }>

  ) {
    const users = Array.from({ length: 100 }, (_, k) =>
      this.createNewUser(k + 1)
    );
    

  }

  ngOnInit(): void {
    this.gameReport$.subscribe((gameReport) => {
      if(gameReport){
        console.log(gameReport);
        this.dataSource = new MatTableDataSource(gameReport.gameRecords);
      }
    })
  }

  calculatePercentage(num1: number, total: number): string {
    return ((num1 / total) * 100).toFixed(0) + '%';
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {
      console.log(this.paginator.pageSize); // Log the current page size value
    });
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

  createNewUser(id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
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

    console.log(
      `Sorted by ${sortState.active} in ${sortState.direction} order`
    );
  }

  compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
