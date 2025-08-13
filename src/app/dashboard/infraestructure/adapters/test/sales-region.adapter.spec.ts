import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SalesRegionAdapter } from '../sales-region.adapter';
import { SaleRegion } from '../../../domain/models/sales-region';
import { SalesRegionDTO } from '../../dtos/api.response';
import { APP_ENV } from '../../../../core/providers';

describe('SalesRegionAdapter', () => {
  let adapter: SalesRegionAdapter;
  let httpMock: HttpTestingController;
  let mockEnv: { apiUrl: string; production: boolean };

  const mockSalesRegions: SaleRegion[] = [
    new SaleRegion('North America', 450000),
    new SaleRegion('Europe', 320000),
    new SaleRegion('Asia Pacific', 280000),
    new SaleRegion('Latin America', 180000),
    new SaleRegion('Middle East', 120000),
  ];

  const mockApiResponse: SalesRegionDTO = {
    regionStats: mockSalesRegions,
  };

  beforeEach(() => {
    mockEnv = {
      apiUrl: 'https://api.example.com',
      production: false,
    };

    TestBed.configureTestingModule({
      providers: [
        SalesRegionAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: APP_ENV,
          useValue: mockEnv,
        },
      ],
    });

    adapter = TestBed.inject(SalesRegionAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSalesRegion', () => {
    it('should fetch sales regions successfully', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions).toEqual(mockSalesRegions);
          expect(regions).toHaveLength(5);
          expect(regions[0]).toBeInstanceOf(SaleRegion);
          expect(regions[0].name).toBe('North America');
          expect(regions[0].value).toBe(450000);
          expect(regions[1].name).toBe('Europe');
          expect(regions[1].value).toBe(320000);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle empty regions array', (done) => {
      const emptyResponse: SalesRegionDTO = { regionStats: [] };
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions).toEqual([]);
          expect(regions).toHaveLength(0);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(emptyResponse);
    });

    it('should handle HTTP error responses', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;
      const errorMessage = 'Server error';

      adapter.getSalesRegion().subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
          done();
        },
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(errorMessage, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    it('should handle network errors', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush('Network error', { status: 0, statusText: 'Network Error' });
    });

    it('should handle malformed response data', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;
      const malformedResponse = { invalidField: 'invalid data' };

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions).toBeUndefined();
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(malformedResponse);
    });

    it('should use correct HTTP method and headers', () => {
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Content-Type')).toBeNull();
    });

    it('should transform API response correctly', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions).toBeDefined();
          expect(Array.isArray(regions)).toBe(true);

          // Verify each region has the correct structure
          regions.forEach((region) => {
            expect(region).toHaveProperty('name');
            expect(region).toHaveProperty('value');
            expect(typeof region.name).toBe('string');
            expect(typeof region.value).toBe('number');
          });

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should maintain SaleRegion instance methods after transformation', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          const firstRegion = regions[0];

          // Test getter methods
          expect(typeof firstRegion.getRegion).toBe('function');
          expect(typeof firstRegion.getValue).toBe('function');

          // Test setter methods
          expect(typeof firstRegion.setRegion).toBe('function');
          expect(typeof firstRegion.setValue).toBe('function');

          // Test method functionality
          expect(firstRegion.getRegion()).toBe('North America');
          expect(firstRegion.getValue()).toBe(450000);

          // Test setter functionality
          firstRegion.setRegion('Updated Region');
          firstRegion.setValue(500000);
          expect(firstRegion.getRegion()).toBe('Updated Region');
          expect(firstRegion.getValue()).toBe(500000);

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should handle single region', (done) => {
      const singleRegion = new SaleRegion('North America', 450000);
      const singleResponse: SalesRegionDTO = { regionStats: [singleRegion] };
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions).toHaveLength(1);
          expect(regions[0].name).toBe('North America');
          expect(regions[0].value).toBe(450000);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(singleResponse);
    });

    it('should handle negative values', (done) => {
      const negativeRegion = new SaleRegion('Loss Region', -50000);
      const negativeResponse: SalesRegionDTO = {
        regionStats: [negativeRegion],
      };
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions[0].value).toBe(-50000);
          expect(regions[0].name).toBe('Loss Region');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(negativeResponse);
    });

    it('should handle zero values', (done) => {
      const zeroRegion = new SaleRegion('Zero Region', 0);
      const zeroResponse: SalesRegionDTO = { regionStats: [zeroRegion] };
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions[0].value).toBe(0);
          expect(regions[0].name).toBe('Zero Region');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(zeroResponse);
    });

    it('should handle decimal values', (done) => {
      const decimalRegion = new SaleRegion('Decimal Region', 125000.5);
      const decimalResponse: SalesRegionDTO = { regionStats: [decimalRegion] };
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions[0].value).toBe(125000.5);
          expect(regions[0].name).toBe('Decimal Region');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(decimalResponse);
    });

    it('should handle empty region names', (done) => {
      const emptyNameRegion = new SaleRegion('', 100000);
      const emptyNameResponse: SalesRegionDTO = {
        regionStats: [emptyNameRegion],
      };
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions[0].name).toBe('');
          expect(regions[0].value).toBe(100000);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(emptyNameResponse);
    });

    it('should handle special characters in region names', (done) => {
      const specialCharRegion = new SaleRegion(
        'North-East & South-West',
        150000,
      );
      const specialCharResponse: SalesRegionDTO = {
        regionStats: [specialCharRegion],
      };
      const expectedUrl = `${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`;

      adapter.getSalesRegion().subscribe({
        next: (regions) => {
          expect(regions[0].name).toBe('North-East & South-West');
          expect(regions[0].value).toBe(150000);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(specialCharResponse);
    });
  });

  describe('SalesRegionAdapter implementation', () => {
    it('should implement SalesRegionPort interface', () => {
      expect(adapter).toBeDefined();
      expect(typeof adapter.getSalesRegion).toBe('function');
    });

    it('should have correct ID_JSON_SALES_REGION constant', () => {
      const result = adapter.getSalesRegion();
      expect(result).toBeDefined();

      // Verify the URL is constructed correctly by checking the HTTP request
      result.subscribe();
      const req = httpMock.expectOne(`${mockEnv.apiUrl}/c/7e36-14ca-4b32-a6b4`);
      req.flush(mockApiResponse);
    });
  });
});
