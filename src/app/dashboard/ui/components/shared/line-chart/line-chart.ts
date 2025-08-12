import { Component, input, OnInit, computed, effect } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { createBaseLineChartConfig } from './config/line-chart.config';
import { SalesDataPoint } from '../../../../domain/interfaces/sales-overview.interface';

@Component({
  selector: 'app-line-chart',
  imports: [NgxEchartsModule],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.scss',
})
export class LineChart implements OnInit {
  chartOption!: EChartsOption;
  data = input<SalesDataPoint[]>([]);

  months = computed(() => this.data().map((item) => item.month));
  revenue = computed(() => this.data().map((item) => item.revenue));
  target = computed(() => this.data().map((item) => item.target));

  constructor() {
    effect(() => {
      const currentData = this.data();
      if (currentData && currentData.length > 0) {
        this.updateChartData();
      }
    });
  }

  private initChart() {
    this.chartOption = createBaseLineChartConfig();
  }

  ngOnInit() {
    this.initChart();
  }

  updateChartData() {
    if (this.chartOption && this.chartOption.xAxis && this.chartOption.series) {
      const xAxis = this.chartOption.xAxis as { data: string[] };
      const series = this.chartOption.series as { data: number[] }[];
      xAxis.data = this.months();
      series[0].data = this.revenue();
      series[1].data = this.target();
      this.chartOption = { ...this.chartOption };
    }
  }
}
