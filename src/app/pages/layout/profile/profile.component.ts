import { Component } from '@angular/core';
import {ProfileInfoComponent} from "./components/profile-info/profile-info.component";
import {GeneralInfoComponent} from "./components/general-info/general-info.component";
import {ContentComponent} from "./components/content/content.component";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileInfoComponent,
    GeneralInfoComponent,
    ContentComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
