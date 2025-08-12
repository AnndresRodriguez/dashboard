import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-line-chart',
  imports: [NgxEchartsModule],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.scss',
})
export class LineChart implements OnInit {
  chartOption!: EChartsOption;

  ngOnInit() {
    this.chartOption = {
      title: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#000',
        textStyle: {
          color: '#fff',
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#00000099',
            type: 'dashed',
            width: 1,
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%', // Ajustar posición desde arriba
        containLabel: true,
        backgroundColor: '#f5f5f5', // Fondo gris claro
        // También puedes usar valores en píxeles:
        // left: 50,
        // right: 50,
        // top: 50,
        // bottom: 50,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          'Apr 2023',
          'May 2023',
          'Jun 2023',
          'Jul 2023',
          'Aug 2023',
          'Sep 2023',
          'Oct 2023',
          'Nov 2023',
          'Dec 2023',
          'Jan 2024',
        ],
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: 400,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#696FFB1F', '#696FFB0A'],
          },
        },
      },
      yAxis: {
        type: 'value',
        position: 'right',
        min: 0,
        max: 30000,
        interval: 10000,
        axisLabel: {
          formatter: function (value: number) {
            if (value === 0) return '$0';
            if (value === 10000) return '$10k';
            if (value === 20000) return '$20k';
            return `$${value / 1000}k`;
          },
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: 400,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ddd',
            type: 'dashed',
          },
        },
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: [
            15000, 12000, 18000, 19000, 16000, 14000, 8000, 9000, 15780.21,
            19000,
          ],
          lineStyle: {
            color: '#696efa', // Azul
            width: 3,
          },
          itemStyle: {
            color: '#ffffff',
            borderColor: '#696efa',
            borderWidth: 2,
          },
          symbol: 'circle',
          symbolSize: 8,
          smooth: false,
        },
        {
          name: 'Target',
          type: 'line',
          data: [
            10000, 12000, 15000, 16000, 18000, 17000, 10000, 9500, 10000, 9000,
          ],
          lineStyle: {
            color: '#ff7f0e', // Naranja
            width: 3,
          },
          itemStyle: {
            color: '#ffffff',
            borderColor: '#ff7f0e',
            borderWidth: 2,
          },
          symbol: 'circle',
          symbolSize: 8,
          smooth: false,
        },
      ],
    };
  }
}
