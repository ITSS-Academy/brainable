import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import {HeaderComponent} from "./components/header/header.component";
import {QuestionListComponent} from "./components/question-list/question-list.component";
import {MainContentComponent} from "./components/main-content/main-content.component";
import {SettingComponent} from "./components/setting/setting.component";

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [MaterialModule, SharedModule, HeaderComponent, QuestionListComponent, MainContentComponent, SettingComponent],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent {}
