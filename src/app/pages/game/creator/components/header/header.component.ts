import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = 'Untitled Quiz';
}
