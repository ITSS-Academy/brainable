import { Component } from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";

@Component({
  selector: 'app-question-list',
  standalone: true,
    imports: [MaterialModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent {

}
