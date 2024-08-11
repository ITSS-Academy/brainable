import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent {}
