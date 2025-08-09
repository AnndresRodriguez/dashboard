import { Component, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CardMetric } from './components/shared/card-metric/card-metric';
import { StatusMetricEnum } from './enums/status-metric-enum';
import { SalesOverview } from './components/sales-overview/sales-overview';
import { SalesByRegion } from './components/sales-by-region/sales-by-region';
import { DonutChart } from './components/shared/donut-chart/donut-chart';
import { RegisteredUsers } from './components/registered-users/registered-users';
import { ListIntegration } from './components/list-integration/list-integration';

@Component({
  selector: 'app-sales-ui',
  imports: [
    CardMetric,
    SalesOverview,
    SalesByRegion,
    RegisteredUsers,
    ListIntegration,
  ],
  templateUrl: './sales-ui.html',
  styleUrl: './sales-ui.scss',
})
export class SalesUi implements AfterViewInit {
  @ViewChild('trafficChart') trafficChart!: DonutChart;

  title = 'Total Sales';
  value = 15000;
  percentage = '25%';
  percentageText = 'Compared to last month';

  premiumUsers = signal(2804);
  basicUsers = signal(397);

  protected readonly StatusMetricEnum = StatusMetricEnum;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.trafficChart.updateUsers(this.premiumUsers(), this.basicUsers());
    });
  }
}
