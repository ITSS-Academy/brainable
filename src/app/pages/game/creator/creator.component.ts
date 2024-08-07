import { Component } from '@angular/core';
import {MaterialModule} from "../../../shared/material.module";

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent {
}
