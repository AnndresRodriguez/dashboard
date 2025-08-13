import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SalesOverviewAdapter } from '../sales-overview.adapter';
import {
  SalesOverviewData,
  SalesDataPoint,
} from '../../../domain/interfaces/sales-overview.interface';
import { SalesOverviewDTO } from '../../dtos/api.response';
import { APP_ENV } from '../../../../core/providers';

describe('SalesOverviewAdapter', () => {
  let adapter: SalesOverviewAdapter;
  let httpMock: HttpTestingController;
  let mockEnv: { apiUrl: string; production: boolean };

  const mockSalesDataPoints: SalesDataPoint[] = [
    { month: 'Jan', revenue: 125000, target: 120000 },
    { month: 'Feb', revenue: 135000, target: 130000 },
    { month: 'Mar', revenue: 145000, target: 140000 },
    { month: 'Apr', revenue: 155000, target: 150000 },
    { month: 'May', revenue: 165000, target: 160000 },
    { month: 'Jun', revenue: 175000, target: 170000 },
  ];

  const mockSalesOverviewData: SalesOverviewData = {
    totalRevenue: 900000,
    totalTarget: 870000,
    data: mockSalesDataPoints,
  };

  const mockApiResponse: SalesOverviewDTO = {
    salesOverview: mockSalesOverviewData,
  };

  beforeEach(() => {
    mockEnv = {
      apiUrl: 'https://api.example.com',
      production: false,
    };

    TestBed.configureTestingModule({
      providers: [
        SalesOverviewAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: APP_ENV,
          useValue: mockEnv,
        },
      ],
    });

    adapter = TestBed.inject(SalesOverviewAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSalesOverview', () => {
    it('should fetch sales overview successfully', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview).toEqual(mockSalesOverviewData);
          expect(salesOverview.totalRevenue).toBe(900000);
          expect(salesOverview.totalTarget).toBe(870000);
          expect(salesOverview.data).toHaveLength(6);
          expect(salesOverview.data[0].month).toBe('Jan');
          expect(salesOverview.data[0].revenue).toBe(125000);
          expect(salesOverview.data[0].target).toBe(120000);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle empty data array', (done) => {
      const emptyData: SalesOverviewData = {
        totalRevenue: 0,
        totalTarget: 0,
        data: [],
      };
      const emptyResponse: SalesOverviewDTO = { salesOverview: emptyData };
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview).toEqual(emptyData);
          expect(salesOverview.totalRevenue).toBe(0);
          expect(salesOverview.totalTarget).toBe(0);
          expect(salesOverview.data).toHaveLength(0);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(emptyResponse);
    });

    it('should handle HTTP error responses', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;
      const errorMessage = 'Server error';

      adapter.getSalesOverview().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;
      const malformedResponse = { invalidField: 'invalid data' };

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview).toBeUndefined();
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(malformedResponse);
    });

    it('should use correct HTTP method and headers', () => {
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Content-Type')).toBeNull();
    });

    it('should transform API response correctly', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview).toBeDefined();
          expect(salesOverview).toHaveProperty('totalRevenue');
          expect(salesOverview).toHaveProperty('totalTarget');
          expect(salesOverview).toHaveProperty('data');
          expect(Array.isArray(salesOverview.data)).toBe(true);

          // Verify data points structure
          salesOverview.data.forEach((dataPoint) => {
            expect(dataPoint).toHaveProperty('month');
            expect(dataPoint).toHaveProperty('revenue');
            expect(dataPoint).toHaveProperty('target');
            expect(typeof dataPoint.month).toBe('string');
            expect(typeof dataPoint.revenue).toBe('number');
            expect(typeof dataPoint.target).toBe('number');
          });

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should handle single data point', (done) => {
      const singleDataPoint: SalesOverviewData = {
        totalRevenue: 125000,
        totalTarget: 120000,
        data: [{ month: 'Jan', revenue: 125000, target: 120000 }],
      };
      const singleResponse: SalesOverviewDTO = {
        salesOverview: singleDataPoint,
      };
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview.data).toHaveLength(1);
          expect(salesOverview.data[0].month).toBe('Jan');
          expect(salesOverview.data[0].revenue).toBe(125000);
          expect(salesOverview.data[0].target).toBe(120000);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(singleResponse);
    });

    it('should handle negative revenue values', (done) => {
      const negativeData: SalesOverviewData = {
        totalRevenue: -50000,
        totalTarget: 100000,
        data: [{ month: 'Jan', revenue: -50000, target: 100000 }],
      };
      const negativeResponse: SalesOverviewDTO = {
        salesOverview: negativeData,
      };
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview.totalRevenue).toBe(-50000);
          expect(salesOverview.data[0].revenue).toBe(-50000);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(negativeResponse);
    });

    it('should handle zero values', (done) => {
      const zeroData: SalesOverviewData = {
        totalRevenue: 0,
        totalTarget: 0,
        data: [{ month: 'Jan', revenue: 0, target: 0 }],
      };
      const zeroResponse: SalesOverviewDTO = { salesOverview: zeroData };
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview.totalRevenue).toBe(0);
          expect(salesOverview.totalTarget).toBe(0);
          expect(salesOverview.data[0].revenue).toBe(0);
          expect(salesOverview.data[0].target).toBe(0);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(zeroResponse);
    });

    it('should handle decimal values', (done) => {
      const decimalData: SalesOverviewData = {
        totalRevenue: 125000.5,
        totalTarget: 120000.75,
        data: [{ month: 'Jan', revenue: 125000.5, target: 120000.75 }],
      };
      const decimalResponse: SalesOverviewDTO = { salesOverview: decimalData };
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview.totalRevenue).toBe(125000.5);
          expect(salesOverview.totalTarget).toBe(120000.75);
          expect(salesOverview.data[0].revenue).toBe(125000.5);
          expect(salesOverview.data[0].target).toBe(120000.75);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(decimalResponse);
    });

    it('should handle different month formats', (done) => {
      const monthData: SalesOverviewData = {
        totalRevenue: 250000,
        totalTarget: 240000,
        data: [
          { month: 'January', revenue: 125000, target: 120000 },
          { month: 'Feb', revenue: 125000, target: 120000 },
        ],
      };
      const monthResponse: SalesOverviewDTO = { salesOverview: monthData };
      const expectedUrl = `${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`;

      adapter.getSalesOverview().subscribe({
        next: (salesOverview) => {
          expect(salesOverview.data[0].month).toBe('January');
          expect(salesOverview.data[1].month).toBe('Feb');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(monthResponse);
    });
  });

  describe('SalesOverviewAdapter implementation', () => {
    it('should implement SalesOverviewPort interface', () => {
      expect(adapter).toBeDefined();
      expect(typeof adapter.getSalesOverview).toBe('function');
    });

    it('should have correct ID_JSON_SALES_OVERVIEW constant', () => {
      const result = adapter.getSalesOverview();
      expect(result).toBeDefined();

      // Verify the URL is constructed correctly by checking the HTTP request
      result.subscribe();
      const req = httpMock.expectOne(`${mockEnv.apiUrl}/c/66ff-e4d9-4d77-80c1`);
      req.flush(mockApiResponse);
    });
  });
});
