import { Component } from '@angular/core';
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {SharedModule} from "../../../../../shared/modules/shared.module";


@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    MaterialModule, SharedModule
  ],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent {

}
