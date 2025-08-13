import { TestBed } from '@angular/core/testing';
import { GetIntegrationsUseCase } from '../get-integrations.usecase';
import { IntegrationPort } from '../../../domain/ports/integration.port';
import { Integration } from '../../../domain/models/integration';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

describe('GetIntegrationsUseCase', () => {
  let useCase: GetIntegrationsUseCase;
  let mockIntegrationPort: jest.Mocked<IntegrationPort>;

  const mockIntegrationsData: Integration[] = [
    new Integration(
      '1',
      'Shopify',
      '/assets/shopify-logo.png',
      'ecommerce',
      85,
      125000,
    ),
    new Integration(
      '2',
      'Stripe',
      '/assets/stripe-logo.png',
      'payment',
      92,
      180000,
    ),
    new Integration(
      '3',
      'Mailchimp',
      '/assets/mailchimp-logo.png',
      'marketing',
      78,
      95000,
    ),
  ];

  beforeEach(() => {
    const mockPort = {
      getIntegrations: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GetIntegrationsUseCase,
        { provide: IntegrationPort, useValue: mockPort },
      ],
    });

    useCase = TestBed.inject(GetIntegrationsUseCase);
    mockIntegrationPort = TestBed.inject(
      IntegrationPort,
    ) as jest.Mocked<IntegrationPort>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute and return integrations data', (done) => {
    // Arrange
    mockIntegrationPort.getIntegrations.mockReturnValue(
      of(mockIntegrationsData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(mockIntegrationsData);
        expect(mockIntegrationPort.getIntegrations).toHaveBeenCalled();
        expect(data.length).toBe(3);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should call the port method when execute is called', () => {
    // Arrange
    mockIntegrationPort.getIntegrations.mockReturnValue(
      of(mockIntegrationsData),
    );

    // Act
    useCase.execute();

    // Assert
    expect(mockIntegrationPort.getIntegrations).toHaveBeenCalled();
  });

  it('should handle empty integrations list', (done) => {
    // Arrange
    mockIntegrationPort.getIntegrations.mockReturnValue(of([]));

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

  it('should handle single integration', (done) => {
    // Arrange
    const singleIntegration = [mockIntegrationsData[0]];
    mockIntegrationPort.getIntegrations.mockReturnValue(of(singleIntegration));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(singleIntegration);
        expect(data.length).toBe(1);
        expect(data[0].application).toBe('Shopify');
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should propagate errors from the port', (done) => {
    // Arrange
    const errorMessage = 'Failed to fetch integrations';
    mockIntegrationPort.getIntegrations.mockReturnValue(
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

  it('should return integrations with correct structure', (done) => {
    // Arrange
    mockIntegrationPort.getIntegrations.mockReturnValue(
      of(mockIntegrationsData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data[0]).toHaveProperty('id');
        expect(data[0]).toHaveProperty('application');
        expect(data[0]).toHaveProperty('logo');
        expect(data[0]).toHaveProperty('type');
        expect(data[0]).toHaveProperty('rate');
        expect(data[0]).toHaveProperty('profit');
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });
});
