import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import {
  CdkFixedSizeVirtualScroll,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  Categories,
  CategoriesByUid,
} from '../../../../../models/categories.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-quiz',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
  ],
  templateUrl: './card-quiz.component.html',
  styleUrl: './card-quiz.component.scss',
})
export class CardQuizComponent {
  @Input() category!: CategoriesByUid;

  constructor(private router: Router) {}

  categoryDetail() {
    this.router.navigate([`/categories/${this.category.uid}`]);
  }

  quizDetail(id: string) {
    this.router.navigate([`/quiz/${id}`]);
  }
}
