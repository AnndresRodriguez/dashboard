import { Component, computed, effect, inject, input } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { DecimalPipe } from '@angular/common';
import {
  COLOR_RIGHT_DARK,
  COLOR_RIGHT_LIGHT,
  createDonutChartConfig,
  createDonutChartDarkConfig,
  createDonutChartLightConfig,
  ValuesDonutChart,
} from './config/donut-chart.config';
import { DarkLightStore } from '../../../store/dark-light.store';

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
  leftLabel = input<string>('');
  rightLabel = input<string>('');

  chartOption: EChartsOption = createDonutChartConfig();

  totalUsers = computed(() => this.valueLeft() + this.valueRight());

  protected readonly modeApp = inject(DarkLightStore);

  constructor() {
    effect(() => {
      if (this.valueLeft() > 0 || this.valueRight() > 0) {
        const data = this.createColorDonutChart();
        this.updateChartData(data);
      }
    });
  }

  updateChartData(data: ValuesDonutChart): void {
    this.chartOption = this.modeApp.darkMode()
      ? createDonutChartDarkConfig(data)
      : createDonutChartLightConfig(data);
  }

  createColorDonutChart(): ValuesDonutChart {
    const colorRight = this.modeApp.darkMode()
      ? COLOR_RIGHT_DARK
      : COLOR_RIGHT_LIGHT;
    return {
      left: {
        value: this.valueLeft(),
        name: this.leftLabel(),
        color: '#696FFB',
      },
      right: {
        value: this.valueRight(),
        name: this.rightLabel(),
        color: colorRight,
      },
    };
  }
}
