import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { LocalTimePipe } from '../../../shared/pipes/local-time.pipe';
import { CardQuizComponent } from './components/card-quiz/card-quiz.component';
import {
  CdkFixedSizeVirtualScroll,
  ScrollingModule,
} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    FormsModule,
    LocalTimePipe,
    CardQuizComponent,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
