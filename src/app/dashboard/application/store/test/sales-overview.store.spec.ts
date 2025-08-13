import { TestBed } from '@angular/core/testing';
import { SalesOverviewStore } from '../sales-overview.store';
import { GetSalesOverviewUseCase } from '../../use-case/get-sales-overview.usecase';
import { SalesOverview } from '../../../domain/models/sales-overview';
import { of, throwError } from 'rxjs';

describe('SalesOverviewStore', () => {
  let store: InstanceType<typeof SalesOverviewStore>;
  let mockGetSalesOverviewUseCase: jest.Mocked<GetSalesOverviewUseCase>;

  const mockOverviewData = {
    totalRevenue: 150000,
    totalTarget: 200000,
    data: [
      { month: 'Enero', revenue: 25000, target: 30000 },
      { month: 'Febrero', revenue: 30000, target: 35000 },
      { month: 'Marzo', revenue: 35000, target: 40000 },
    ],
  };

  beforeEach(() => {
    mockGetSalesOverviewUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetSalesOverviewUseCase>;

    TestBed.configureTestingModule({
      providers: [
        SalesOverviewStore,
        {
          provide: GetSalesOverviewUseCase,
          useValue: mockGetSalesOverviewUseCase,
        },
      ],
    });

    store = TestBed.inject(SalesOverviewStore);
  });

  describe('Initial state', () => {
    it('should have the correct initial state', () => {
      expect(store.salesOverview()).toBeNull();
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should have correct computed signals in initial state', () => {
      expect(store.hasData()).toBe(false);
      expect(store.hasError()).toBe(false);
      expect(store.isEmpty()).toBe(true);
    });
  });

  describe('loadSalesOverview', () => {
    it('should load sales overview successfully', (done) => {
      mockGetSalesOverviewUseCase.execute.mockReturnValue(of(mockOverviewData));

      store.loadSalesOverview();

      setTimeout(() => {
        const loadedOverview = store.salesOverview();
        expect(loadedOverview).toBeInstanceOf(SalesOverview);
        expect(loadedOverview?.totalRevenue).toBe(
          mockOverviewData.totalRevenue,
        );
        expect(loadedOverview?.totalTarget).toBe(mockOverviewData.totalTarget);
        expect(loadedOverview?.data).toEqual(mockOverviewData.data);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.hasData()).toBe(true);
        expect(store.isEmpty()).toBe(false);
        done();
      });
    });

    it('should handle errors correctly', (done) => {
      const errorMessage = 'Error al cargar resumen de ventas';
      mockGetSalesOverviewUseCase.execute.mockReturnValue(
        throwError(() => new Error(errorMessage)),
      );

      store.loadSalesOverview();

      setTimeout(() => {
        expect(store.error()).toBe(errorMessage);
        expect(store.loading()).toBe(false);
        expect(store.hasError()).toBe(true);
        expect(store.salesOverview()).toBeNull();
        done();
      });
    });

    it('should handle errors without specific message', (done) => {
      mockGetSalesOverviewUseCase.execute.mockReturnValue(
        throwError(() => new Error()),
      );

      store.loadSalesOverview();

      setTimeout(() => {
        expect(store.error()).toBe('Error al cargar resumen de ventas');
        expect(store.loading()).toBe(false);
        expect(store.hasError()).toBe(true);
        done();
      });
    });

    it('should set loading to true when starting the load', () => {
      mockGetSalesOverviewUseCase.execute.mockReturnValue(of(mockOverviewData));

      store.loadSalesOverview();
      expect(store.error()).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear the error correctly', (done) => {
      mockGetSalesOverviewUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadSalesOverview();

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
      mockGetSalesOverviewUseCase.execute.mockReturnValue(of(mockOverviewData));

      store.loadSalesOverview();

      setTimeout(() => {
        expect(store.salesOverview()).not.toBeNull();
        expect(store.loading()).toBe(false);

        store.reset();

        expect(store.salesOverview()).toBeNull();
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.hasData()).toBe(false);
        expect(store.hasError()).toBe(false);
        expect(store.isEmpty()).toBe(true);
        done();
      });
    });
  });

  describe('Computed signals', () => {
    it('should calculate hasData correctly when there are data', (done) => {
      mockGetSalesOverviewUseCase.execute.mockReturnValue(of(mockOverviewData));

      store.loadSalesOverview();

      setTimeout(() => {
        expect(store.hasData()).toBe(true);
        done();
      });
    });

    it('should calculate isEmpty correctly when there are no data and not loading', () => {
      expect(store.isEmpty()).toBe(true);
    });

    it('should calculate hasError correctly when there is an error', (done) => {
      mockGetSalesOverviewUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadSalesOverview();

      setTimeout(() => {
        expect(store.hasError()).toBe(true);
        done();
      });
    });
  });

  describe('Handling of SalesOverview data', () => {
    it('should create correctly the SalesOverview object with the received data', (done) => {
      mockGetSalesOverviewUseCase.execute.mockReturnValue(of(mockOverviewData));

      store.loadSalesOverview();

      setTimeout(() => {
        const overview = store.salesOverview();
        expect(overview).toBeInstanceOf(SalesOverview);
        expect(overview?.totalRevenue).toBe(150000);
        expect(overview?.totalTarget).toBe(200000);
        expect(overview?.data).toHaveLength(3);
        expect(overview?.data[0].month).toBe('Enero');
        expect(overview?.data[0].revenue).toBe(25000);
        done();
      });
    });
  });
});
