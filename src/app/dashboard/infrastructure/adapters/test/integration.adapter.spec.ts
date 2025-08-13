import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { IntegrationAdapter } from '../integration.adapter';
import { Integration } from '../../../domain/models/integration';
import { IntegrationDTO } from '../../dtos/api.response';
import { APP_ENV } from '../../../../core/providers';

describe('IntegrationAdapter', () => {
  let adapter: IntegrationAdapter;
  let httpMock: HttpTestingController;
  let mockEnv: { apiUrl: string; production: boolean };

  const mockIntegrations: Integration[] = [
    new Integration(
      '1',
      'Salesforce',
      'assets/salesforce-logo.png',
      'CRM',
      85,
      12500,
      false,
    ),
    new Integration(
      '2',
      'HubSpot',
      'assets/hubspot-logo.png',
      'Marketing',
      92,
      18750,
      true,
    ),
    new Integration(
      '3',
      'Zapier',
      'assets/zapier-logo.png',
      'Automation',
      78,
      8900,
      false,
    ),
  ];

  const mockApiResponse: IntegrationDTO = {
    integrations: mockIntegrations,
  };

  beforeEach(() => {
    mockEnv = {
      apiUrl: 'https://api.example.com',
      production: false,
    };

    TestBed.configureTestingModule({
      providers: [
        IntegrationAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: APP_ENV,
          useValue: mockEnv,
        },
      ],
    });

    adapter = TestBed.inject(IntegrationAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getIntegrations', () => {
    it('should fetch integrations successfully', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;

      adapter.getIntegrations().subscribe({
        next: (integrations) => {
          expect(integrations).toEqual(mockIntegrations);
          expect(integrations).toHaveLength(3);
          expect(integrations[0]).toBeInstanceOf(Integration);
          expect(integrations[0].id).toBe('1');
          expect(integrations[0].application).toBe('Salesforce');
          expect(integrations[1].isSelected).toBe(true);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle empty integrations array', (done) => {
      const emptyResponse: IntegrationDTO = { integrations: [] };
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;

      adapter.getIntegrations().subscribe({
        next: (integrations) => {
          expect(integrations).toEqual([]);
          expect(integrations).toHaveLength(0);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(emptyResponse);
    });

    it('should handle HTTP error responses', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;
      const errorMessage = 'Server error';

      adapter.getIntegrations().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;

      adapter.getIntegrations().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;
      const malformedResponse = { invalidField: 'invalid data' };

      adapter.getIntegrations().subscribe({
        next: (integrations) => {
          expect(integrations).toBeUndefined();
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(malformedResponse);
    });

    it('should use correct HTTP method and headers', () => {
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;

      adapter.getIntegrations().subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Content-Type')).toBeNull();
    });

    it('should transform API response correctly', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;

      adapter.getIntegrations().subscribe({
        next: (integrations) => {
          expect(integrations).toBeDefined();
          expect(Array.isArray(integrations)).toBe(true);

          // Verify each integration has the correct structure
          integrations.forEach((integration) => {
            expect(integration).toHaveProperty('id');
            expect(integration).toHaveProperty('application');
            expect(integration).toHaveProperty('logo');
            expect(integration).toHaveProperty('type');
            expect(integration).toHaveProperty('rate');
            expect(integration).toHaveProperty('profit');
            expect(integration).toHaveProperty('isSelected');
          });

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should maintain integration instance methods after transformation', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`;

      adapter.getIntegrations().subscribe({
        next: (integrations) => {
          const firstIntegration = integrations[0];

          // Test instance methods
          expect(typeof firstIntegration.formattedProfit).toBe('string');
          expect(typeof firstIntegration.formattedRate).toBe('string');
          expect(typeof firstIntegration.rateProgress).toBe('number');
          expect(typeof firstIntegration.toggleSelection).toBe('function');
          expect(typeof firstIntegration.setSelected).toBe('function');
          expect(typeof firstIntegration.updateRate).toBe('function');
          expect(typeof firstIntegration.updateProfit).toBe('function');

          // Test method functionality
          expect(firstIntegration.formattedProfit).toContain('$');
          expect(firstIntegration.formattedRate).toContain('%');
          expect(firstIntegration.rateProgress).toBe(0.85);

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });
  });

  describe('IntegrationAdapter implementation', () => {
    it('should implement IntegrationPort interface', () => {
      expect(adapter).toBeDefined();
      expect(typeof adapter.getIntegrations).toBe('function');
    });

    it('should have correct ID_JSON_INTEGRATIONS constant', () => {
      // Access the private property through reflection or test the behavior
      const result = adapter.getIntegrations();
      expect(result).toBeDefined();

      // Verify the URL is constructed correctly by checking the HTTP request
      result.subscribe();
      const req = httpMock.expectOne(`${mockEnv.apiUrl}/c/3bde-f00f-4eb3-a567`);
      req.flush(mockApiResponse);
    });
  });
});
