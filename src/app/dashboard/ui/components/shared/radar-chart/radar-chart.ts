import { Component, OnInit, OnDestroy, input, effect } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import {
  createRadarChartConfig,
  createRadarChartDarkConfig,
  createRadarChartLightConfig,
} from './config/radar-chart.config';
import { SaleRegion } from '../../../../domain/models/sales-region';

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
  private isDarkMode = false;

  data = input<SaleRegion[]>([]);

  constructor() {
    effect(() => {
      const currentData = this.data();
      if (currentData && currentData.length > 0) {
        this.updateChartData(currentData);
      }
    });
  }

  async ngOnInit() {
    this.initChart();
  }

  private initChart() {
    // const data = this.getDynamicData();

    const baseConfig = this.isDarkMode
      ? createRadarChartDarkConfig()
      : createRadarChartLightConfig();

    this.chartOption = createRadarChartConfig(this.data(), baseConfig);
  }

  /**
   * Método para obtener datos de ejemplo (simula una llamada a API)
   * Borrar este método cuando se tenga la API
   */
  // getDynamicData(): RadarChartData[] {
  //   return [
  //     { name: 'Pacific', value: 2475 },
  //     { name: 'Middle Est', value: 1749 },
  //     { name: 'Africa', value: 1591 },
  //     { name: 'Americans', value: 1762 },
  //     { name: 'Europe', value: 2865 },
  //     { name: 'Asia', value: 2201 },
  //   ];
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onChartInit(ec: any) {
    this.chartInstance = ec;
  }

  /**
   * Método para obtener datos dinámicamente
   * @param data - Array de datos para el radar chart
   * @param maxValue - Valor máximo opcional (por defecto 3000)
   */
  updateChartData(data: SaleRegion[]) {
    this.chartOption = createRadarChartConfig(data, this.chartOption);
    if (this.chartInstance) {
      this.chartInstance.setOption(this.chartOption);
    }
  }

  createDataSeries(data: SaleRegion[]): number[] {
    return data.map((item) => item.value);
  }

  /**
   * Método para cargar datos dinámicos
   */
  loadDynamicData(data: SaleRegion[]) {
    this.updateChartData(data);
  }

  changeToDarkMode() {
    this.isDarkMode = true;
    const baseConfig = createRadarChartDarkConfig();
    this.chartOption = createRadarChartConfig(this.data(), baseConfig);

    if (this.chartInstance) {
      this.chartInstance.setOption(this.chartOption);
    }
  }

  changeToLightMode() {
    this.isDarkMode = false;
    const baseConfig = createRadarChartLightConfig();
    this.chartOption = createRadarChartConfig(this.data(), baseConfig);

    if (this.chartInstance) {
      this.chartInstance.setOption(this.chartOption);
    }
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
}
