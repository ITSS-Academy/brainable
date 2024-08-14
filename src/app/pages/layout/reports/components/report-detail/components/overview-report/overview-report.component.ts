import { Component } from '@angular/core';
import {MaterialModule} from "../../../../../../../shared/modules/material.module";
import {SharedModule} from "../../../../../../../shared/modules/shared.module";

@Component({
  selector: 'app-overview-report',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './overview-report.component.html',
  styleUrl: './overview-report.component.scss'
})
export class OverviewReportComponent {

}
