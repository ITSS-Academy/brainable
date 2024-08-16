import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    MatIcon,
    FormsModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
