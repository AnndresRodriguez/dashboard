import { Component, computed, effect, input } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { DecimalPipe } from '@angular/common';
import {
  createDonutChartConfig,
  createDonutChartDarkConfig,
  createDonutChartLightConfig,
  ValuesDonutChart,
} from './config/donut-chart.config';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [NgxEchartsModule, DecimalPipe],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss',
})
export class DonutChart {
  valueLeft = input<number>(0);
  valueRight = input<number>(0);
  chartOption: EChartsOption = createDonutChartConfig();

  leftLabel = input<string>('');
  rightLabel = input<string>('');

  totalUsers = computed(() => this.valueLeft() + this.valueRight());

  isDarkMode = false;

  constructor() {
    effect(() => {
      // Solo actualizar si los valores son mayores a 0
      if (this.valueLeft() > 0 || this.valueRight() > 0) {
        this.updateChartData({
          left: {
            value: this.valueLeft(),
            name: this.leftLabel(),
            color: '#696FFB',
          },
          right: {
            value: this.valueRight(),
            name: this.rightLabel(),
            color: '#3a3c8a',
          },
        });
      }
    });
  }

  updateChartData(data: ValuesDonutChart): void {
    this.chartOption = this.isDarkMode
      ? createDonutChartDarkConfig(data)
      : createDonutChartLightConfig(data);
  }

  changeToDarkMode() {
    this.isDarkMode = true;
    this.updateChartData({
      left: {
        value: this.valueLeft(),
        name: this.leftLabel(),
        color: '#696FFB',
      },
      right: {
        value: this.valueRight(),
        name: this.rightLabel(),
        color: '#3a3c8a',
      },
    });
  }

  changeToLightMode() {
    this.isDarkMode = false;
    this.updateChartData({
      left: {
        value: this.valueLeft(),
        name: this.leftLabel(),
        color: '#696FFB',
      },
      right: {
        value: this.valueRight(),
        name: this.rightLabel(),
        color: '#3a3c8a',
      },
    });
  }
}
