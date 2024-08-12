import { Injectable } from '@angular/core';
import { Topic } from '../../models/quiz.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private authService: AuthService) {}

  topics: Topic[] = [
    {
      img: 'https://www.google.com',
      title: 'Math', // Sửa lại đây từ 'tite' thành 'title'
      description: 'This is a math topic',
    },
  ];
}
