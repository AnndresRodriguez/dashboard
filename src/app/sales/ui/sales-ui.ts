import { Component } from '@angular/core';
import { CardMetric } from './components/card-metric/card-metric';
import { StatusMetricEnum } from './enums/status-metric-enum';

@Component({
  selector: 'app-sales-ui',
  imports: [CardMetric],
  templateUrl: './sales-ui.html',
  styleUrl: './sales-ui.scss',
})
export class SalesUi {
  title = 'Total Sales';
  value = 15000;
  percentage = '25%';
  percentageText = 'Compared to last month';

  protected readonly StatusMetricEnum = StatusMetricEnum;
}
