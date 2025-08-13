import { TestBed } from '@angular/core/testing';
import { GetSalesOverviewUseCase } from '../get-sales-overview.usecase';
import { SalesOverviewPort } from '../../../domain/ports/sales-overview.port';
import { SalesOverviewData } from '../../../domain/interfaces/sales-overview.interface';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

describe('GetSalesOverviewUseCase', () => {
  let useCase: GetSalesOverviewUseCase;
  let mockSalesOverviewPort: jest.Mocked<SalesOverviewPort>;

  const mockSalesOverviewData: SalesOverviewData = {
    totalRevenue: 1250000,
    totalTarget: 1000000,
    data: [
      { month: 'Jan', revenue: 100000, target: 80000 },
      { month: 'Feb', revenue: 110000, target: 85000 },
      { month: 'Mar', revenue: 120000, target: 90000 },
      { month: 'Apr', revenue: 130000, target: 95000 },
      { month: 'May', revenue: 140000, target: 100000 },
      { month: 'Jun', revenue: 150000, target: 105000 },
    ],
  };

  beforeEach(() => {
    const mockPort = {
      getSalesOverview: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GetSalesOverviewUseCase,
        { provide: SalesOverviewPort, useValue: mockPort },
      ],
    });

    useCase = TestBed.inject(GetSalesOverviewUseCase);
    mockSalesOverviewPort = TestBed.inject(
      SalesOverviewPort,
    ) as jest.Mocked<SalesOverviewPort>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute and return sales overview data', (done) => {
    // Arrange
    mockSalesOverviewPort.getSalesOverview.mockReturnValue(
      of(mockSalesOverviewData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(mockSalesOverviewData);
        expect(mockSalesOverviewPort.getSalesOverview).toHaveBeenCalled();
        expect(data.totalRevenue).toBe(1250000);
        expect(data.totalTarget).toBe(1000000);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should call the port method when execute is called', () => {
    // Arrange
    mockSalesOverviewPort.getSalesOverview.mockReturnValue(
      of(mockSalesOverviewData),
    );

    // Act
    useCase.execute();

    // Assert
    expect(mockSalesOverviewPort.getSalesOverview).toHaveBeenCalled();
  });

  it('should handle zero sales data', (done) => {
    // Arrange
    const zeroSalesData: SalesOverviewData = {
      totalRevenue: 0,
      totalTarget: 0,
      data: [],
    };
    mockSalesOverviewPort.getSalesOverview.mockReturnValue(of(zeroSalesData));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(zeroSalesData);
        expect(data.totalRevenue).toBe(0);
        expect(data.totalTarget).toBe(0);
        expect(data.data.length).toBe(0);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should propagate errors from the port', (done) => {
    // Arrange
    const errorMessage = 'Failed to fetch sales overview data';
    mockSalesOverviewPort.getSalesOverview.mockReturnValue(
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

  it('should return sales overview data with correct structure', (done) => {
    // Arrange
    mockSalesOverviewPort.getSalesOverview.mockReturnValue(
      of(mockSalesOverviewData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toHaveProperty('totalRevenue');
        expect(data).toHaveProperty('totalTarget');
        expect(data).toHaveProperty('data');
        expect(typeof data.totalRevenue).toBe('number');
        expect(typeof data.totalTarget).toBe('number');
        expect(Array.isArray(data.data)).toBe(true);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should handle monthly data correctly', (done) => {
    // Arrange
    mockSalesOverviewPort.getSalesOverview.mockReturnValue(
      of(mockSalesOverviewData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data.data.length).toBe(6);
        expect(data.data[0]).toHaveProperty('month');
        expect(data.data[0]).toHaveProperty('revenue');
        expect(data.data[0]).toHaveProperty('target');
        expect(data.data[0].month).toBe('Jan');
        expect(data.data[0].revenue).toBe(100000);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });
});
