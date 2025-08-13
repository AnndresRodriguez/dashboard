import { TestBed } from '@angular/core/testing';
import { SalesRegionStore } from '../sales-region.store';
import { GetSalesRegionUseCase } from '../../use-case/get-sales-region.usecase';
import { SaleRegion } from '../../../domain/models/sales-region';
import { of, throwError } from 'rxjs';

describe('SalesRegionStore', () => {
  let store: InstanceType<typeof SalesRegionStore>;
  let mockGetSalesRegionUseCase: jest.Mocked<GetSalesRegionUseCase>;

  const mockRegionData: SaleRegion[] = [
    new SaleRegion('Norte', 45000),
    new SaleRegion('Sur', 38000),
    new SaleRegion('Este', 52000),
    new SaleRegion('Oeste', 29000),
  ];

  beforeEach(() => {
    mockGetSalesRegionUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetSalesRegionUseCase>;

    TestBed.configureTestingModule({
      providers: [
        SalesRegionStore,
        {
          provide: GetSalesRegionUseCase,
          useValue: mockGetSalesRegionUseCase,
        },
      ],
    });

    store = TestBed.inject(SalesRegionStore);
  });

  describe('Initial state', () => {
    it('should have the correct initial state', () => {
      expect(store.salesRegion()).toEqual([]);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should have correct computed signals in initial state', () => {
      expect(store.hasError()).toBe(false);
      expect(store.isEmpty()).toBe(true);
    });
  });

  describe('loadSalesRegion', () => {
    it('should load sales regions successfully', (done) => {
      mockGetSalesRegionUseCase.execute.mockReturnValue(of(mockRegionData));

      store.loadSalesRegion();

      setTimeout(() => {
        const loadedRegions = store.salesRegion();
        expect(loadedRegions).toHaveLength(4);
        expect(loadedRegions[0]).toBeInstanceOf(SaleRegion);
        expect(loadedRegions[0].name).toBe('Norte');
        expect(loadedRegions[0].value).toBe(45000);
        expect(loadedRegions[1].name).toBe('Sur');
        expect(loadedRegions[1].value).toBe(38000);
        expect(loadedRegions[2].name).toBe('Este');
        expect(loadedRegions[2].value).toBe(52000);
        expect(loadedRegions[3].name).toBe('Oeste');
        expect(loadedRegions[3].value).toBe(29000);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.isEmpty()).toBe(false);
        done();
      });
    });

    it('should handle errors correctly', (done) => {
      const errorMessage = 'Error al cargar regiones de ventas';
      mockGetSalesRegionUseCase.execute.mockReturnValue(
        throwError(() => new Error(errorMessage)),
      );

      store.loadSalesRegion();

      setTimeout(() => {
        expect(store.error()).toBe(errorMessage);
        expect(store.loading()).toBe(false);
        expect(store.hasError()).toBe(true);
        expect(store.salesRegion()).toEqual([]);
        done();
      });
    });

    it('should handle errors without specific message', (done) => {
      mockGetSalesRegionUseCase.execute.mockReturnValue(
        throwError(() => new Error()),
      );

      store.loadSalesRegion();

      setTimeout(() => {
        expect(store.error()).toBe('Error al cargar regiones de ventas');
        expect(store.loading()).toBe(false);
        expect(store.hasError()).toBe(true);
        done();
      });
    });

    it('should set loading to true when starting the load', () => {
      mockGetSalesRegionUseCase.execute.mockReturnValue(of(mockRegionData));

      store.loadSalesRegion();
      expect(store.error()).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear the error correctly', (done) => {
      mockGetSalesRegionUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadSalesRegion();

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
      mockGetSalesRegionUseCase.execute.mockReturnValue(of(mockRegionData));

      store.loadSalesRegion();

      setTimeout(() => {
        expect(store.salesRegion()).toHaveLength(4);
        expect(store.loading()).toBe(false);

        store.reset();

        expect(store.salesRegion()).toEqual([]);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.hasError()).toBe(false);
        expect(store.isEmpty()).toBe(true);
        done();
      });
    });
  });

  describe('Computed signals', () => {
    it('should calculate isEmpty correctly when there are no data and not loading', () => {
      expect(store.isEmpty()).toBe(true);
    });

    it('should calculate isEmpty correctly when there are data', (done) => {
      mockGetSalesRegionUseCase.execute.mockReturnValue(of(mockRegionData));

      store.loadSalesRegion();

      setTimeout(() => {
        expect(store.isEmpty()).toBe(false);
        done();
      });
    });

    it('should calculate hasError correctly when there is an error', (done) => {
      mockGetSalesRegionUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadSalesRegion();

      setTimeout(() => {
        expect(store.hasError()).toBe(true);
        done();
      });
    });
  });

  describe('Handling of SaleRegion data', () => {
    it('should handle correctly an empty array of regions', (done) => {
      mockGetSalesRegionUseCase.execute.mockReturnValue(of([]));

      store.loadSalesRegion();

      setTimeout(() => {
        expect(store.salesRegion()).toEqual([]);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.isEmpty()).toBe(true);
        done();
      });
    });

    it('should handle correctly a single region', (done) => {
      const singleRegion = [new SaleRegion('Centro', 15000)];
      mockGetSalesRegionUseCase.execute.mockReturnValue(of(singleRegion));

      store.loadSalesRegion();

      setTimeout(() => {
        const loadedRegions = store.salesRegion();
        expect(loadedRegions).toHaveLength(1);
        expect(loadedRegions[0].name).toBe('Centro');
        expect(loadedRegions[0].value).toBe(15000);
        expect(store.isEmpty()).toBe(false);
        done();
      });
    });
  });
});
