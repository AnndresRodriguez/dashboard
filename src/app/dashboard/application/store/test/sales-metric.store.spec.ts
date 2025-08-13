import { TestBed } from '@angular/core/testing';
import { SalesMetricStore } from '../sales-metric.store';
import { GetSalesMetricsUseCase } from '../../use-case/get-sales-metrics.usecase';
import { SaleMetric } from '../../../domain/models/sales-metrics';
import { of, throwError } from 'rxjs';

describe('SalesMetricStore', () => {
  let store: InstanceType<typeof SalesMetricStore>;
  let mockGetSalesMetricsUseCase: jest.Mocked<GetSalesMetricsUseCase>;

  const mockMetricsResponse = [
    {
      title: 'Ventas Totales',
      value: 50000,
      currency: 'USD',
      percentageChange: 15.5,
      changeType: 'up' as const,
      description: 'Ventas del mes actual',
    },
    {
      title: 'Ingresos Netos',
      value: 35000,
      currency: 'USD',
      percentageChange: -5.2,
      changeType: 'down' as const,
      description: 'Ingresos después de descuentos',
    },
  ];

  beforeEach(() => {
    mockGetSalesMetricsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetSalesMetricsUseCase>;

    TestBed.configureTestingModule({
      providers: [
        SalesMetricStore,
        {
          provide: GetSalesMetricsUseCase,
          useValue: mockGetSalesMetricsUseCase,
        },
      ],
    });

    store = TestBed.inject(SalesMetricStore);
  });

  describe('Initial state', () => {
    it('should have the correct initial state', () => {
      expect(store.salesMetrics()).toEqual([]);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should have correct computed signals in initial state', () => {
      expect(store.totalMetrics()).toBe(0);
      expect(store.hasError()).toBe(false);
      expect(store.isEmpty()).toBe(true);
    });
  });

  describe('loadSalesMetrics', () => {
    it('should load sales metrics successfully', (done) => {
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        of(mockMetricsResponse),
      );

      store.loadSalesMetrics();

      setTimeout(() => {
        const loadedMetrics = store.salesMetrics();
        expect(loadedMetrics).toHaveLength(2);
        expect(loadedMetrics[0]).toBeInstanceOf(SaleMetric);
        expect(loadedMetrics[0].title).toBe('Ventas Totales');
        expect(loadedMetrics[0].value).toBe(50000);
        expect(loadedMetrics[1].title).toBe('Ingresos Netos');
        expect(loadedMetrics[1].value).toBe(35000);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.totalMetrics()).toBe(2);
        expect(store.isEmpty()).toBe(false);
        done();
      });
    });

    it('should handle errors correctly', (done) => {
      const errorMessage = 'Error al cargar métricas de ventas';
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        throwError(() => new Error(errorMessage)),
      );

      store.loadSalesMetrics();

      setTimeout(() => {
        expect(store.error()).toBe(errorMessage);
        expect(store.loading()).toBe(false);
        expect(store.hasError()).toBe(true);
        expect(store.salesMetrics()).toEqual([]);
        done();
      });
    });

    it('should handle errors without specific message', (done) => {
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        throwError(() => new Error()),
      );

      store.loadSalesMetrics();

      setTimeout(() => {
        expect(store.error()).toBe('Error al cargar métricas de ventas');
        expect(store.loading()).toBe(false);
        expect(store.hasError()).toBe(true);
        done();
      });
    });

    it('should set loading to true when starting the load', () => {
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        of(mockMetricsResponse),
      );

      store.loadSalesMetrics();
      expect(store.error()).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear the error correctly', (done) => {
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadSalesMetrics();

      setTimeout(() => {
        expect(store.error()).toBe('Error test');
        expect(store.hasError()).toBe(true);

        store.clearError();

        expect(store.error()).toBeNull();
        expect(store.hasError()).toBe(false);
        done();
      });
    });
  });

  describe('reset', () => {
    it('should reset the state to initial values', (done) => {
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        of(mockMetricsResponse),
      );

      store.loadSalesMetrics();

      setTimeout(() => {
        expect(store.salesMetrics()).toHaveLength(2);
        expect(store.loading()).toBe(false);

        store.reset();

        expect(store.salesMetrics()).toEqual([]);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.totalMetrics()).toBe(0);
        expect(store.hasError()).toBe(false);
        expect(store.isEmpty()).toBe(true);
        done();
      });
    });
  });

  describe('Computed signals', () => {
    it('should calculate totalMetrics correctly', (done) => {
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        of(mockMetricsResponse),
      );

      store.loadSalesMetrics();

      setTimeout(() => {
        expect(store.totalMetrics()).toBe(2);
        done();
      });
    });

    it('should calculate isEmpty correctly when there are no data and not loading', () => {
      expect(store.isEmpty()).toBe(true);
    });

    it('should calculate hasError correctly when there is an error', (done) => {
      mockGetSalesMetricsUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadSalesMetrics();

      setTimeout(() => {
        expect(store.hasError()).toBe(true);
        done();
      });
    });
  });
});
