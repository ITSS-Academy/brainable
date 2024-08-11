import { Component } from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {

}
