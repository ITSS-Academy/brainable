import { Pipe, PipeTransform } from '@angular/core';
import {QuizService} from "../services/quiz/quiz.service";
import {Quiz} from "../models/quiz.model";

@Pipe({
  name: 'getQuizById',
  standalone: true
})
export class GetQuizByIdPipe implements PipeTransform {
  constructor(private quizService: QuizService){
  }

  transform(id: string): Promise<Quiz> {
    return this.quizService.getQuizById(id);
  }
}
