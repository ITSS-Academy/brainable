import { Injectable } from '@angular/core';
import { Topic } from '../../models/quiz.model';
import { AuthService } from '../auth/auth.service';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private authService: AuthService) {
  }

  getCardData(): Observable<Topic[]> {
    const cardData: Topic[] = [
      {
        title: '⭐Subject 1',
        text: 'This is a long text that should be truncated after two lines. It might not fit completely in the given space, but this is just a test.',
        questions: 123,
        plays: 321
      },
      {
        title: '⭐Subject 2',
        text: 'This is a long text that should be truncated after two lines. It might not fit completely in the given space, but this is just a test.',
        questions: 456,
        plays: 654
      },
      {
        title: '⭐Subject 3',
        text: 'This is a long text that should be truncated after two lines. It might not fit completely in the given space, but this is just a test.',
        questions: 789,
        plays: 987
      }
      // Thêm nhiều đối tượng nếu cần
    ];
    return of(cardData);
  }

  getStyles() {
    return `
      .container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
      }
    `;
  }
}
