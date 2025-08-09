import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  templateUrl: './radar-chart.html',
  styleUrl: './radar-chart.scss',
})
export class RadarChart implements OnInit, OnDestroy {
  chartOption: EChartsOption = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private chartInstance: any = null;

  ngOnInit() {
    console.log('RadarChart ngOnInit - Inicializando gráfico');
    this.initChart();
  }

  private initChart() {
    console.log('RadarChart initChart - Configurando opciones');
    this.chartOption = {
      title: {
        show: false,
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderWidth: 0,
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
        padding: [8, 12],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          // Para radar charts con trigger 'item', usamos el nombre directamente
          return `${params.name}: ${params.value}`;
        },
      },
      radar: {
        indicator: [
          { name: 'Pacific', max: 3000 },
          { name: 'Middle Est', max: 3000 },
          { name: 'Africa', max: 3000 },
          { name: 'Americans', max: 3000 },
          { name: 'Europe', max: 3000 },
          { name: 'Asia', max: 3000 },
        ],
        radius: '70%',
        center: ['50%', '50%'],
        startAngle: 180, // Gira el radar chart 90 grados hacia la derecha
        splitNumber: 5,
        axisName: {
          color: '#333',
          fontSize: 11,
          formatter: (name?: string) => {
            if (!name) return '';
            const values = [2475, 1749, 1591, 1762, 2865, 2201];
            const regions = [
              'Pacific',
              'Middle Est',
              'Africa',
              'Americans',
              'Europe',
              'Asia',
            ];
            const index = regions.indexOf(name);
            return `${name}\n{value|${values[index]}}`;
          },
          rich: {
            value: {
              fontSize: 13,
              fontWeight: 'bold',
              color: '#333',
              padding: [3, 0, 0, 0],
            },
          },
        },
        splitLine: {
          lineStyle: {
            color: ['#e0e0e0'],
            width: 1,
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#e8e8ff', '#e8e8ff', '#e8e8ff', '#e8e8ff', '#f2f2ff'],
          },
        },
        axisLine: {
          lineStyle: {
            color: '#e0e0e0',
          },
        },
      },
      series: [
        {
          name: 'Ventas',
          type: 'radar',
          tooltip: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (params: any) => {
              return `${params.name}: ${params.value}`;
            },
          },
          data: [
            {
              value: [2475, 1749, 1591, 1762, 2865, 2201],
              name: 'Ventas por Región',
              itemStyle: {
                color: '#3b82f6',
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#696FFB52',
                    },
                    {
                      offset: 1,
                      color: '#696FFB',
                    },
                  ],
                },
              },
              lineStyle: {
                color: '#696FFB',
                width: 2,
              },
              symbol: 'circle',
              symbolSize: 5,
            },
          ],
        },
      ],
    };
    console.log(
      'RadarChart initChart - Opciones configuradas:',
      this.chartOption,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChartInit(ec: any) {
    console.log('RadarChart onChartInit - Gráfico inicializado:', ec);
    this.chartInstance = ec;
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
}
