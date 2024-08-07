import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlidebarComponent } from '../../components/slidebar/slidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MaterialModule } from '../../shared/modules/material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SlidebarComponent, HeaderComponent, MaterialModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
