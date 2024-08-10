import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {SharedModule} from "../../../../../shared/modules/shared.module";
import {Quiz} from "../../../../../models/quiz.model";

@Component({
  selector: 'app-card-quiz',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './card-quiz.component.html',
  styleUrl: './card-quiz.component.scss'
})
export class CardQuizComponent {
  @Input() data!: Quiz; // Nhận dữ liệu kiểu Quiz từ component cha
}


