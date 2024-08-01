import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss',
})
export class HostComponent {}
