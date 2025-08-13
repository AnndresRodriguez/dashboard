import { TestBed } from '@angular/core/testing';
import { ListIntegrationStore } from '../list-integration.store';
import { GetIntegrationsUseCase } from '../../use-case/get-integrations.usecase';
import { Integration } from '../../../domain/models/integration';
import { of, throwError } from 'rxjs';

describe('ListIntegrationStore', () => {
  let store: InstanceType<typeof ListIntegrationStore>;
  let mockGetIntegrationsUseCase: jest.Mocked<GetIntegrationsUseCase>;

  const mockIntegrations: Integration[] = [
    new Integration('1', 'App1', 'logo1.png', 'type1', 75, 1000, false),
    new Integration('2', 'App2', 'logo2.png', 'type2', 50, 2000, true),
  ];

  beforeEach(() => {
    mockGetIntegrationsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetIntegrationsUseCase>;

    TestBed.configureTestingModule({
      providers: [
        ListIntegrationStore,
        {
          provide: GetIntegrationsUseCase,
          useValue: mockGetIntegrationsUseCase,
        },
      ],
    });

    store = TestBed.inject(ListIntegrationStore);
  });

  describe('Initial state', () => {
    it('should have the correct initial state', () => {
      expect(store.listIntegration()).toEqual([]);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should have correct computed signals in initial state', () => {
      expect(store.hasData()).toBe(false);
      expect(store.hasError()).toBe(false);
      expect(store.isEmpty()).toBe(true);
    });
  });

  describe('loadListIntegration', () => {
    it('should load integrations successfully', (done) => {
      mockGetIntegrationsUseCase.execute.mockReturnValue(of(mockIntegrations));

      store.loadListIntegration();

      setTimeout(() => {
        expect(store.listIntegration()).toEqual(mockIntegrations);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.hasData()).toBe(true);
        expect(store.isEmpty()).toBe(false);
        done();
      }, 500);
    });
  });

  describe('Computed signals', () => {
    it('should calculate hasData correctly when there are data', (done) => {
      mockGetIntegrationsUseCase.execute.mockReturnValue(of(mockIntegrations));

      store.loadListIntegration();

      setTimeout(() => {
        expect(store.hasData()).toBe(true);
        done();
      }, 500);
    });

    it('should calculate isEmpty correctly when there are no data and not loading', () => {
      expect(store.isEmpty()).toBe(true);
    });

    it('should calculate hasError correctly when there is an error', (done) => {
      mockGetIntegrationsUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadListIntegration();

      setTimeout(() => {
        expect(store.hasError()).toBe(true);
        done();
      }, 500);
    });
  });
});
