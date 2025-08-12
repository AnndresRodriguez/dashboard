import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { StatusMetricEnum } from '../../../enums/status-metric-enum';

@Component({
  selector: 'app-card-metric',
  imports: [DecimalPipe],
  templateUrl: './card-metric.html',
  styleUrl: './card-metric.scss',
})
export class CardMetric {
  title = input<string>('');
  value = input<number>(0);
  currency = input<string>('');
  percentageChange = input<number>(0);
  changeType = input<string>('up');
  description = input<string>('');

  protected readonly StatusMetricEnum = StatusMetricEnum;

  getStatusClasses(): string {
    switch (this.changeType()) {
      case StatusMetricEnum.UP:
        return 'bg-green-light dark:bg-green-dark';
      case StatusMetricEnum.DOWN:
        return 'bg-red-light dark:bg-red-dark';
      case StatusMetricEnum.EQUAL:
        return 'bg-blue-20 dark:bg-blue-60';
      default:
        return 'bg-blue-8';
    }
  }
}
