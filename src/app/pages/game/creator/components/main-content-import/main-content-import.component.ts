import { Component, Input } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-main-content-import',
  standalone: true,
  imports: [JsonPipe, NgIf, NgForOf],
  templateUrl: './main-content-import.component.html',
  styleUrl: './main-content-import.component.scss',
})
export class MainContentImportComponent {
  @Input() ExcelData: any;

  objectKeys = Object.keys;
}
