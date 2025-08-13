import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadarChart } from './radar-chart';
import { DarkLightStore } from '../../../store/dark-light.store';
import { SaleRegion } from '../../../../domain/models/sales-region';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import {
  createRadarChartConfig,
  createRadarChartLightConfig,
} from './config/radar-chart.config';

describe('RadarChart', () => {
  let component: RadarChart;
  let fixture: ComponentFixture<RadarChart>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let darkLightStore: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockChartInstance: any;
  let mockSaleRegions: SaleRegion[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarChart, NgxEchartsModule],
      providers: [
        DarkLightStore,
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: {
            echarts: () => import('echarts'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RadarChart);
    component = fixture.componentInstance;
    darkLightStore = TestBed.inject(DarkLightStore);

    // Create mock data
    mockSaleRegions = [
      new SaleRegion('North', 1500),
      new SaleRegion('South', 2200),
      new SaleRegion('East', 1800),
      new SaleRegion('West', 1200),
      new SaleRegion('Central', 2500),
    ];

    // Mock chart instance
    mockChartInstance = {
      setOption: jest.fn(),
      dispose: jest.fn(),
    };

    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize chart instance as null', () => {
      expect(component['chartInstance']).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should call initChart on ngOnInit', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initChartSpy = jest.spyOn(component as any, 'initChart');

      await component.ngOnInit();

      expect(initChartSpy).toHaveBeenCalled();
    });
  });

  describe('initChart', () => {
    it('should create light mode config when dark mode is false', () => {
      darkLightStore.setDarkMode(false);

      component['initChart']();

      expect(component.chartOption).toBeDefined();
      expect(component.chartOption).not.toEqual({});
    });

    it('should create dark mode config when dark mode is true', () => {
      darkLightStore.setDarkMode(true);

      component['initChart']();

      expect(component.chartOption).toBeDefined();
      expect(component.chartOption).not.toEqual({});
    });
  });

  describe('onChartInit', () => {
    it('should set chart instance when chart is initialized', async () => {
      await component.onChartInit(mockChartInstance);

      expect(component['chartInstance']).toBe(mockChartInstance);
    });
  });

  describe('updateChartData', () => {
    beforeEach(() => {
      component['chartInstance'] = mockChartInstance;
    });

    it('should update chart option with new data', () => {
      const initialOption = component.chartOption;

      component.updateChartData(mockSaleRegions);

      expect(component.chartOption).not.toEqual(initialOption);
      expect(component.chartOption).toBeDefined();
    });

    it('should call setOption on chart instance when available', () => {
      component.updateChartData(mockSaleRegions);

      expect(mockChartInstance.setOption).toHaveBeenCalledWith(
        component.chartOption,
      );
    });

    it('should not call setOption when chart instance is null', () => {
      component['chartInstance'] = null;

      component.updateChartData(mockSaleRegions);

      expect(mockChartInstance.setOption).not.toHaveBeenCalled();
    });

    it('should use light mode config when dark mode is false', () => {
      darkLightStore.setDarkMode(false);

      component.updateChartData(mockSaleRegions);

      expect(component.chartOption).toBeDefined();
    });

    it('should use dark mode config when dark mode is true', () => {
      darkLightStore.setDarkMode(true);

      component.updateChartData(mockSaleRegions);

      expect(component.chartOption).toBeDefined();
    });
  });

  describe('createDataSeries', () => {
    it('should return array of values from SaleRegion data', () => {
      const result = component.createDataSeries(mockSaleRegions);

      expect(result).toEqual([1500, 2200, 1800, 1200, 2500]);
    });

    it('should return empty array for empty data', () => {
      const result = component.createDataSeries([]);

      expect(result).toEqual([]);
    });

    it('should handle single item data', () => {
      const singleData = [new SaleRegion('Test', 1000)];
      const result = component.createDataSeries(singleData);

      expect(result).toEqual([1000]);
    });
  });

  describe('loadDynamicData', () => {
    it('should call updateChartData with provided data', () => {
      const updateChartDataSpy = jest.spyOn(component, 'updateChartData');

      component.loadDynamicData(mockSaleRegions);

      expect(updateChartDataSpy).toHaveBeenCalledWith(mockSaleRegions);
    });
  });

  describe('changeToDarkMode', () => {
    beforeEach(() => {
      component['chartInstance'] = mockChartInstance;
    });

    it('should update chart option with dark mode config', () => {
      const initialOption = component.chartOption;

      component.changeToDarkMode();

      expect(component.chartOption).not.toEqual(initialOption);
      expect(component.chartOption).toBeDefined();
    });

    it('should call setOption on chart instance', () => {
      component.changeToDarkMode();

      expect(mockChartInstance.setOption).toHaveBeenCalledWith(
        component.chartOption,
      );
    });

    it('should not call setOption when chart instance is null', () => {
      component['chartInstance'] = null;

      component.changeToDarkMode();

      expect(mockChartInstance.setOption).not.toHaveBeenCalled();
    });
  });

  describe('changeToLightMode', () => {
    beforeEach(() => {
      component['chartInstance'] = mockChartInstance;
    });

    it('should update chart option with light mode config', () => {
      const initialOption = component.chartOption;

      component.changeToLightMode();

      expect(component.chartOption).not.toEqual(initialOption);
      expect(component.chartOption).toBeDefined();
    });

    it('should call setOption on chart instance', () => {
      component.changeToLightMode();

      expect(mockChartInstance.setOption).toHaveBeenCalledWith(
        component.chartOption,
      );
    });

    it('should not call setOption when chart instance is null', () => {
      component['chartInstance'] = null;

      component.changeToLightMode();

      expect(mockChartInstance.setOption).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should dispose chart instance when available', () => {
      component['chartInstance'] = mockChartInstance;

      component.ngOnDestroy();

      expect(mockChartInstance.dispose).toHaveBeenCalled();
    });

    it('should not throw error when chart instance is null', () => {
      component['chartInstance'] = null;

      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Chart Configuration', () => {
    it('should create proper chart configuration with data', () => {
      const config = createRadarChartConfig(
        mockSaleRegions,
        createRadarChartLightConfig(),
      );

      expect(config).toBeDefined();
      expect(config.radar).toBeDefined();
      expect(config.series).toBeDefined();
    });

    it('should include radar indicators for each data point', () => {
      const config = createRadarChartConfig(
        mockSaleRegions,
        createRadarChartLightConfig(),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const radarConfig = config.radar as any;

      expect(radarConfig.indicator).toHaveLength(mockSaleRegions.length);
      expect(radarConfig.indicator[0].name).toBe('North');
      expect(radarConfig.indicator[0].max).toBeDefined();
    });

    it('should include series data with values', () => {
      const config = createRadarChartConfig(
        mockSaleRegions,
        createRadarChartLightConfig(),
      );

      expect(config.series).toBeDefined();
      expect(config.series).toHaveLength(1);
      if (config.series && config.series[0]) {
        expect(config.series[0].data).toHaveLength(1);
        expect(config.series[0].data[0].value).toEqual([
          1500, 2200, 1800, 1200, 2500,
        ]);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data array', () => {
      const emptyData: SaleRegion[] = [];

      expect(() => component.updateChartData(emptyData)).not.toThrow();
      expect(() => component.createDataSeries(emptyData)).not.toThrow();
    });

    it('should handle single data point', () => {
      const singleData = [new SaleRegion('Single', 1000)];

      expect(() => component.updateChartData(singleData)).not.toThrow();
      expect(component.createDataSeries(singleData)).toEqual([1000]);
    });

    it('should handle large data values', () => {
      const largeData = [
        new SaleRegion('Large1', 1000000),
        new SaleRegion('Large2', 2000000),
      ];

      expect(() => component.updateChartData(largeData)).not.toThrow();
      expect(component.createDataSeries(largeData)).toEqual([1000000, 2000000]);
    });

    it('should handle zero values', () => {
      const zeroData = [new SaleRegion('Zero1', 0), new SaleRegion('Zero2', 0)];

      expect(() => component.updateChartData(zeroData)).not.toThrow();
      expect(component.createDataSeries(zeroData)).toEqual([0, 0]);
    });

    it('should handle negative values', () => {
      const negativeData = [
        new SaleRegion('Negative1', -100),
        new SaleRegion('Negative2', -200),
      ];

      expect(() => component.updateChartData(negativeData)).not.toThrow();
      expect(component.createDataSeries(negativeData)).toEqual([-100, -200]);
    });
  });

  describe('Theme Switching', () => {
    beforeEach(() => {
      component['chartInstance'] = mockChartInstance;
    });

    it('should switch between light and dark themes correctly', () => {
      // Start with light mode
      darkLightStore.setDarkMode(false);
      component.updateChartData(mockSaleRegions);
      const lightOption = { ...component.chartOption };

      // Switch to dark mode
      darkLightStore.setDarkMode(true);
      component.updateChartData(mockSaleRegions);
      const darkOption = { ...component.chartOption };

      expect(lightOption).not.toEqual(darkOption);
    });

    it('should maintain data when switching themes', () => {
      component.updateChartData(mockSaleRegions);

      darkLightStore.setDarkMode(true);
      component.updateChartData(mockSaleRegions);

      expect(component.chartOption).toBeDefined();
      expect(component.chartOption).not.toEqual({});
    });
  });

  describe('Performance', () => {
    it('should handle rapid data updates', () => {
      component['chartInstance'] = mockChartInstance;

      for (let i = 0; i < 10; i++) {
        const testData = [new SaleRegion(`Region${i}`, i * 100)];
        expect(() => component.updateChartData(testData)).not.toThrow();
      }

      expect(mockChartInstance.setOption).toHaveBeenCalledTimes(10);
    });

    it('should handle rapid theme switches', () => {
      component['chartInstance'] = mockChartInstance;

      for (let i = 0; i < 5; i++) {
        darkLightStore.setDarkMode(i % 2 === 0);
        expect(() => component.updateChartData(mockSaleRegions)).not.toThrow();
      }
    });
  });
});
