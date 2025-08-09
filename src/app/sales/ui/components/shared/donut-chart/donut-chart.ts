import { Component, computed, signal } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-donut-chart',
  imports: [NgxEchartsModule, DecimalPipe],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss',
})
export class DonutChart {
  value = signal(3201);
  color = signal('#8B5CF6');

  premiumUsers = signal(2804);
  basicUsers = signal(397);

  totalUsers = computed(() => this.premiumUsers() + this.basicUsers());

  // Computed signal para el chart option
  chartOption = computed<EChartsOption>(() => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: '#000000',
      borderColor: '#000000',
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
      extraCssText: 'border-radius: 8px; padding: 8px 12px;',
      position: 'right',
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: 'Users',
        type: 'pie',
        radius: ['70%', '85%'],
        center: ['50%', '60%'],
        startAngle: 180,
        endAngle: 360,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false, // Desactivar labels
        },
        emphasis: {
          label: {
            show: false, // Desactivar labels en hover también
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: this.premiumUsers(),
            name: 'Premium Users',
            itemStyle: {
              color: '#696FFB',
            },
          },
          {
            value: this.basicUsers(),
            name: 'Basic Users',
            itemStyle: {
              color: '#696FFB99',
            },
          },
        ],
      },
    ],
  }));

  updateValue(newValue: number): void {
    this.value.set(newValue);
  }

  updateChart(newValue: number, newColor: string): void {
    this.value.set(newValue);
    this.color.set(newColor);
  }

  updateUsers(premium: number, basic: number): void {
    this.premiumUsers.set(premium);
    this.basicUsers.set(basic);
  }
}
