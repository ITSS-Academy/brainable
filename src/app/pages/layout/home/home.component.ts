import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { LocalTimePipe } from '../../../shared/pipes/local-time.pipe';
import { CardQuizComponent } from './components/card-quiz/card-quiz.component';
import { TopicService } from '../../../services/topic/topic.service';
import { Topic } from '../../../models/quiz.model'; // Import mô hình Topic

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, FormsModule, LocalTimePipe, CardQuizComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quizzes: Topic[] = []; // Khai báo biến quizzes

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.loadQuizzes(); // Gọi phương thức để lấy dữ liệu
  }

  loadQuizzes(): void {
    this.topicService.getCardData().subscribe((data: Topic[]) => {
      this.quizzes = data;
    });
  }

  trackByIndex(index: number, item: Topic): number {
    return index; // Trả về chỉ mục cho trackBy
  }
}
