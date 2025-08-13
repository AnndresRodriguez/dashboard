import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SalesMetricsAdapter } from '../sales-metric.adapter';
import { SaleMetric } from '../../../domain/models/sales-metrics';
import { SalesMetricsDTO } from '../../dtos/api.response';
import { APP_ENV } from '../../../../core/providers';

describe('SalesMetricsAdapter', () => {
  let adapter: SalesMetricsAdapter;
  let httpMock: HttpTestingController;
  let mockEnv: { apiUrl: string; production: boolean };

  const mockSalesMetrics: SaleMetric[] = [
    new SaleMetric(
      'Total Revenue',
      125000,
      'USD',
      12.5,
      'up',
      'Revenue increased by 12.5% compared to last month',
    ),
    new SaleMetric(
      'Average Order Value',
      85.5,
      'USD',
      -2.3,
      'down',
      'Average order value decreased by 2.3%',
    ),
    new SaleMetric(
      'Conversion Rate',
      3.2,
      '%',
      0.0,
      'equal',
      'Conversion rate remained stable',
    ),
  ];

  const mockApiResponse: SalesMetricsDTO = {
    stats: mockSalesMetrics,
  };

  beforeEach(() => {
    mockEnv = {
      apiUrl: 'https://api.example.com',
      production: false,
    };

    TestBed.configureTestingModule({
      providers: [
        SalesMetricsAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: APP_ENV,
          useValue: mockEnv,
        },
      ],
    });

    adapter = TestBed.inject(SalesMetricsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSalesMetrics', () => {
    it('should fetch sales metrics successfully', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics).toEqual(mockSalesMetrics);
          expect(metrics).toHaveLength(3);
          expect(metrics[0]).toBeInstanceOf(SaleMetric);
          expect(metrics[0].title).toBe('Total Revenue');
          expect(metrics[0].value).toBe(125000);
          expect(metrics[0].currency).toBe('USD');
          expect(metrics[0].percentageChange).toBe(12.5);
          expect(metrics[0].changeType).toBe('up');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle empty metrics array', (done) => {
      const emptyResponse: SalesMetricsDTO = { stats: [] };
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics).toEqual([]);
          expect(metrics).toHaveLength(0);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(emptyResponse);
    });

    it('should handle HTTP error responses', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;
      const errorMessage = 'Server error';

      adapter.getSalesMetrics().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;
      const malformedResponse = { invalidField: 'invalid data' };

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics).toBeUndefined();
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(malformedResponse);
    });

    it('should use correct HTTP method and headers', () => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Content-Type')).toBeNull();
    });

    it('should transform API response correctly', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics).toBeDefined();
          expect(Array.isArray(metrics)).toBe(true);

          // Verify each metric has the correct structure
          metrics.forEach((metric) => {
            expect(metric).toHaveProperty('title');
            expect(metric).toHaveProperty('value');
            expect(metric).toHaveProperty('currency');
            expect(metric).toHaveProperty('percentageChange');
            expect(metric).toHaveProperty('changeType');
            expect(metric).toHaveProperty('description');
          });

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should maintain SaleMetric instance methods after transformation', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          const firstMetric = metrics[0];

          // Test getter methods
          expect(typeof firstMetric.getTitle).toBe('function');
          expect(typeof firstMetric.getValue).toBe('function');
          expect(typeof firstMetric.getCurrency).toBe('function');
          expect(typeof firstMetric.getPercentageChange).toBe('function');
          expect(typeof firstMetric.getChangeType).toBe('function');
          expect(typeof firstMetric.getDescription).toBe('function');

          // Test setter methods
          expect(typeof firstMetric.setTitle).toBe('function');
          expect(typeof firstMetric.setValue).toBe('function');
          expect(typeof firstMetric.setCurrency).toBe('function');
          expect(typeof firstMetric.setPercentageChange).toBe('function');
          expect(typeof firstMetric.setChangeType).toBe('function');
          expect(typeof firstMetric.setDescription).toBe('function');

          // Test method functionality
          expect(firstMetric.getTitle()).toBe('Total Revenue');
          expect(firstMetric.getValue()).toBe(125000);
          expect(firstMetric.getCurrency()).toBe('USD');
          expect(firstMetric.getPercentageChange()).toBe(12.5);
          expect(firstMetric.getChangeType()).toBe('up');
          expect(firstMetric.getDescription()).toBe(
            'Revenue increased by 12.5% compared to last month',
          );

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should handle different change types correctly', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics[0].changeType).toBe('up');
          expect(metrics[1].changeType).toBe('down');
          expect(metrics[2].changeType).toBe('equal');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should handle different currency types', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics[0].currency).toBe('USD');
          expect(metrics[1].currency).toBe('USD');
          expect(metrics[2].currency).toBe('%');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should handle negative percentage changes', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics[1].percentageChange).toBe(-2.3);
          expect(metrics[1].changeType).toBe('down');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should handle zero percentage changes', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`;

      adapter.getSalesMetrics().subscribe({
        next: (metrics) => {
          expect(metrics[2].percentageChange).toBe(0.0);
          expect(metrics[2].changeType).toBe('equal');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });
  });

  describe('SalesMetricsAdapter implementation', () => {
    it('should implement SalesMetricsPort interface', () => {
      expect(adapter).toBeDefined();
      expect(typeof adapter.getSalesMetrics).toBe('function');
    });

    it('should have correct ID_JSON_SALES_METRICS constant', () => {
      const result = adapter.getSalesMetrics();
      expect(result).toBeDefined();

      // Verify the URL is constructed correctly by checking the HTTP request
      result.subscribe();
      const req = httpMock.expectOne(`${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`);
      req.flush(mockApiResponse);
    });

    it('should not include delay parameter in URL', () => {
      const result = adapter.getSalesMetrics();
      result.subscribe();

      const req = httpMock.expectOne(`${mockEnv.apiUrl}/c/1dbe-8a86-4247-8d53`);
      expect(req.request.url).not.toContain('delay');
      req.flush(mockApiResponse);
    });
  });
});
