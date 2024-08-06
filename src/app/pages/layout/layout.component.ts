import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlidebarComponent } from '../../shared/components/slidebar/slidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SlidebarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
