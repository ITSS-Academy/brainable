import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {SharedModule} from "../../../../../shared/modules/shared.module";
import {Quiz, Topic} from "../../../../../models/quiz.model";
import {TopicService} from "../../../../../services/topic/topic.service";

@Component({
  selector: 'app-card-quiz',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './card-quiz.component.html',
  styleUrl: './card-quiz.component.scss'
})
export class CardQuizComponent {
  constructor(public topicService: TopicService) {
  }
  @Input() topics!:Topic;
  @Input() data!: Quiz; // Nhận dữ liệu kiểu Quiz từ component cha
}


