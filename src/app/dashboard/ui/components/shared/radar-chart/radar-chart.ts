import {
  Component,
  OnInit,
  OnDestroy,
  input,
  effect,
  inject,
} from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import {
  createRadarChartConfig,
  createRadarChartDarkConfig,
  createRadarChartLightConfig,
} from './config/radar-chart.config';
import { SaleRegion } from '../../../../domain/models/sales-region';
import { DarkLightStore } from '../../../store/dark-light.store';

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
  // private isDarkMode = false;

  data = input<SaleRegion[]>([]);

  protected readonly modeApp = inject(DarkLightStore);

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
    const baseConfig = this.modeApp.darkMode()
      ? createRadarChartDarkConfig()
      : createRadarChartLightConfig();

    this.chartOption = createRadarChartConfig(this.data(), baseConfig);
  }

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
    this.chartOption = this.modeApp.darkMode()
      ? createRadarChartDarkConfig()
      : createRadarChartLightConfig();
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
    const baseConfig = createRadarChartDarkConfig();
    this.chartOption = createRadarChartConfig(this.data(), baseConfig);

    if (this.chartInstance) {
      this.chartInstance.setOption(this.chartOption);
    }
  }

  changeToLightMode() {
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
