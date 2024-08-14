import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {SharedModule} from "../../../../../shared/modules/shared.module";
import {TopicService} from "../../../../../services/topic/topic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-quiz',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './card-quiz.component.html',
  styleUrl: './card-quiz.component.scss'
})
export class CardQuizComponent {
  constructor(public topicService: TopicService ,
              public router: Router) {
  }
  // @Input() topics!:Topic;
  // @Input() data!: Quiz;

  @Input() title: string = '';
  @Input() questions: number = 0;
  @Input() plays: number = 0;
  @Input() id: number = 0;
  quizzes: any;


}


