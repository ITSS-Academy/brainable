import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { CdkFixedSizeVirtualScroll, ScrollingModule } from '@angular/cdk/scrolling';


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
  styleUrls: ['./card-quiz.component.scss'],
})
export class CardQuizComponent {
}
