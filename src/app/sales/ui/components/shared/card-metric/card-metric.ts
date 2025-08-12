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
  percentage = input<string>('');
  percentageText = input<string>('');
  status = input<StatusMetricEnum>(StatusMetricEnum.EQUAL);

  protected readonly StatusMetricEnum = StatusMetricEnum;

  getStatusClasses(): string {
    switch (this.status()) {
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
