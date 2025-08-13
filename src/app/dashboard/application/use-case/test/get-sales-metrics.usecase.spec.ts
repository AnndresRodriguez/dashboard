import { TestBed } from '@angular/core/testing';
import { GetSalesMetricsUseCase } from '../get-sales-metrics.usecase';
import { SalesMetricsPort } from '../../../domain/ports/sales-metrics.port';
import { SaleMetric } from '../../../domain/models/sales-metrics';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

describe('GetSalesMetricsUseCase', () => {
  let useCase: GetSalesMetricsUseCase;
  let mockSalesMetricsPort: jest.Mocked<SalesMetricsPort>;

  const mockSalesMetricsData: SaleMetric[] = [
    new SaleMetric(
      'Total Sales',
      150000,
      'USD',
      12.5,
      'up',
      'Total sales for the month',
    ),
    new SaleMetric(
      'Average Order Value',
      250,
      'USD',
      8.3,
      'down',
      'Average order value for the month',
    ),
  ];

  beforeEach(() => {
    const mockPort = {
      getSalesMetrics: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GetSalesMetricsUseCase,
        { provide: SalesMetricsPort, useValue: mockPort },
      ],
    });

    useCase = TestBed.inject(GetSalesMetricsUseCase);
    mockSalesMetricsPort = TestBed.inject(
      SalesMetricsPort,
    ) as jest.Mocked<SalesMetricsPort>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute and return sales metrics data', (done) => {
    // Arrange
    mockSalesMetricsPort.getSalesMetrics.mockReturnValue(
      of(mockSalesMetricsData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(mockSalesMetricsData);
        expect(mockSalesMetricsPort.getSalesMetrics).toHaveBeenCalled();
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should call the port method when execute is called', () => {
    // Arrange
    mockSalesMetricsPort.getSalesMetrics.mockReturnValue(
      of(mockSalesMetricsData),
    );

    // Act
    useCase.execute();

    // Assert
    expect(mockSalesMetricsPort.getSalesMetrics).toHaveBeenCalled();
  });

  it('should handle empty response', (done) => {
    // Arrange
    mockSalesMetricsPort.getSalesMetrics.mockReturnValue(of([]));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual([]);
        expect(data.length).toBe(0);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should propagate errors from the port', (done) => {
    // Arrange
    const errorMessage = 'Failed to fetch sales metrics';
    mockSalesMetricsPort.getSalesMetrics.mockReturnValue(
      new Observable((subscriber) => {
        subscriber.error(new Error(errorMessage));
      }),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: () => {
        fail('Should not have succeeded');
      },
      error: (error) => {
        expect(error.message).toBe(errorMessage);
        done();
      },
    });
  });
});
