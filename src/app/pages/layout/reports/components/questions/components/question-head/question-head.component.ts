import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-question-head',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './question-head.component.html',
  styleUrl: './question-head.component.scss',
})
export class QuestionHeadComponent {
  value: number = 76;
  mode: 'determinate' | 'indeterminate' = 'determinate';
}
