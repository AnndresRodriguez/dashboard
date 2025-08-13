import { TestBed } from '@angular/core/testing';
import { GetSalesRegionUseCase } from '../get-sales-region.usecase';
import { SalesRegionPort } from '../../../domain/ports/sales-region.port';
import { SaleRegion } from '../../../domain/models/sales-region';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

describe('GetSalesRegionUseCase', () => {
  let useCase: GetSalesRegionUseCase;
  let mockSalesRegionPort: jest.Mocked<SalesRegionPort>;

  const mockSalesRegionData: SaleRegion[] = [
    new SaleRegion('Americans', 450000),
    new SaleRegion('Europe', 320000),
    new SaleRegion('Pacific', 180000),
    new SaleRegion('Africa', 50000),
    new SaleRegion('Middle East', 120000),
  ];

  beforeEach(() => {
    const mockPort = {
      getSalesRegion: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GetSalesRegionUseCase,
        { provide: SalesRegionPort, useValue: mockPort },
      ],
    });

    useCase = TestBed.inject(GetSalesRegionUseCase);
    mockSalesRegionPort = TestBed.inject(
      SalesRegionPort,
    ) as jest.Mocked<SalesRegionPort>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute and return sales region data', (done) => {
    // Arrange
    mockSalesRegionPort.getSalesRegion.mockReturnValue(of(mockSalesRegionData));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(mockSalesRegionData);
        expect(mockSalesRegionPort.getSalesRegion).toHaveBeenCalled();
        expect(data.length).toBe(5);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should call the port method when execute is called', () => {
    // Arrange
    mockSalesRegionPort.getSalesRegion.mockReturnValue(of(mockSalesRegionData));

    // Act
    useCase.execute();

    // Assert
    expect(mockSalesRegionPort.getSalesRegion).toHaveBeenCalled();
  });

  it('should handle empty sales region list', (done) => {
    // Arrange
    mockSalesRegionPort.getSalesRegion.mockReturnValue(of([]));

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

  it('should handle single region data', (done) => {
    // Arrange
    const singleRegion = [mockSalesRegionData[0]];
    mockSalesRegionPort.getSalesRegion.mockReturnValue(of(singleRegion));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(singleRegion);
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Americans');
        expect(data[0].value).toBe(450000);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should propagate errors from the port', (done) => {
    // Arrange
    const errorMessage = 'Failed to fetch sales region data';
    mockSalesRegionPort.getSalesRegion.mockReturnValue(
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

  it('should return sales region data with correct structure', (done) => {
    // Arrange
    mockSalesRegionPort.getSalesRegion.mockReturnValue(of(mockSalesRegionData));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data[0]).toHaveProperty('name');
        expect(data[0]).toHaveProperty('value');
        expect(typeof data[0].name).toBe('string');
        expect(typeof data[0].value).toBe('number');
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should validate total sales calculation', (done) => {
    // Arrange
    mockSalesRegionPort.getSalesRegion.mockReturnValue(of(mockSalesRegionData));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        const totalSales = data.reduce((sum, region) => sum + region.value, 0);
        expect(totalSales).toBe(1120000);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });
});
