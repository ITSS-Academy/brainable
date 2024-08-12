import { Component } from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent {

}
