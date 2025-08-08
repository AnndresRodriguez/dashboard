import { Component, model } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { StatusMetricEnum } from '../../enums/status-metric-enum';

@Component({
  selector: 'app-card-metric',
  imports: [DecimalPipe],
  templateUrl: './card-metric.html',
  styleUrl: './card-metric.scss',
})
export class CardMetric {
  title = model<string>('');
  value = model<number>(0);
  percentage = model<string>('');
  percentageText = model<string>('');
  status = model<StatusMetricEnum>(StatusMetricEnum.EQUAL);

  protected readonly StatusMetricEnum = StatusMetricEnum;
}
