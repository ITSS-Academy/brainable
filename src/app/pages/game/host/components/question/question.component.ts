import { Component } from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {

}
