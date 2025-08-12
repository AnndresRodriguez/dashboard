import { Component } from '@angular/core';
import { LineChart } from '../shared/line-chart/line-chart';

@Component({
  selector: 'app-sales-overview',
  imports: [LineChart],
  templateUrl: './sales-overview.html',
  styleUrl: './sales-overview.scss',
})
export class SalesOverview {}
