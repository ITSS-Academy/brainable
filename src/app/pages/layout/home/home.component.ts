import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { LocalTimePipe } from '../../../shared/pipes/local-time.pipe';
import { CardQuizComponent } from './components/card-quiz/card-quiz.component';
import {
  CdkFixedSizeVirtualScroll,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { Categories, CategoriesByUid } from '../../../models/categories.model';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../shared/modules/shared.module';
import * as CategoriesActions from '../../../ngrx/categories/categories.actions';
import { CategoriesState } from '../../../ngrx/categories/categories.state';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    LocalTimePipe,
    SharedModule,
    CardQuizComponent,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
    LoadingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  listCategories: Categories[] = [];
  isGettingCategories$ = this.store.select(
    'categories',
    'isGetAllCategoriesSuccessful',
  );

  iceBreaker!: CategoriesByUid;
  social!: CategoriesByUid;
  languages!: CategoriesByUid;

  constructor(
    private store: Store<{ auth: AuthState; categories: CategoriesState }>,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('categories', 'categories').subscribe((categories) => {
        this.listCategories = categories as Categories[];
        if (this.listCategories.length > 0) {
          this.iceBreaker = this.listCategories[0] as CategoriesByUid;
          this.social = this.listCategories[1] as CategoriesByUid;
          this.languages = this.listCategories[2] as CategoriesByUid;
        }
        console.log(this.listCategories);
      }),
    );
    this.store.dispatch(CategoriesActions.getAllCategories());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
