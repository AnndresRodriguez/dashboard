import { TestBed } from '@angular/core/testing';
import { RegisteredUsersStore } from '../registered-users.store';
import { GetRegisteredUsersUseCase } from '../../use-case/get-registered-users.usecase';
import { Users } from '../../../domain/models/registered-users';
import { of, throwError } from 'rxjs';

describe('RegisteredUsersStore', () => {
  let store: InstanceType<typeof RegisteredUsersStore>;
  let mockGetRegisteredUsersUseCase: jest.Mocked<GetRegisteredUsersUseCase>;

  const mockUsersData = {
    total: 1000,
    premium: 300,
    basic: 700,
  };

  const mockUsers = new Users(
    mockUsersData.total,
    mockUsersData.premium,
    mockUsersData.basic,
  );

  beforeEach(() => {
    mockGetRegisteredUsersUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetRegisteredUsersUseCase>;

    TestBed.configureTestingModule({
      providers: [
        RegisteredUsersStore,
        {
          provide: GetRegisteredUsersUseCase,
          useValue: mockGetRegisteredUsersUseCase,
        },
      ],
    });

    store = TestBed.inject(RegisteredUsersStore);
  });

  describe('Initial state', () => {
    it('should have the correct initial state', () => {
      expect(store.registeredUsers()).toBeNull();
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should have correct computed signals in initial state', () => {
      expect(store.hasData()).toBe(false);
      expect(store.hasError()).toBe(false);
      expect(store.isEmpty()).toBe(true);
    });
  });

  describe('loadRegisteredUsers', () => {
    it('should load registered users successfully', (done) => {
      mockGetRegisteredUsersUseCase.execute.mockReturnValue(of(mockUsers));

      store.loadRegisteredUsers();

      setTimeout(() => {
        const loadedUsers = store.registeredUsers();
        expect(loadedUsers).toBeInstanceOf(Users);
        expect(loadedUsers?.total).toBe(mockUsersData.total);
        expect(loadedUsers?.premium).toBe(mockUsersData.premium);
        expect(loadedUsers?.basic).toBe(mockUsersData.basic);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.hasData()).toBe(true);
        expect(store.isEmpty()).toBe(false);
        done();
      });
    });
  });

  describe('clearError', () => {
    it('should clear the error correctly', (done) => {
      mockGetRegisteredUsersUseCase.execute.mockReturnValue(
        throwError(() => new Error('Error test')),
      );

      store.loadRegisteredUsers();

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
      mockGetRegisteredUsersUseCase.execute.mockReturnValue(of(mockUsers));

      store.loadRegisteredUsers();

      setTimeout(() => {
        expect(store.registeredUsers()).not.toBeNull();
        expect(store.loading()).toBe(false);

        store.reset();

        expect(store.registeredUsers()).toBeNull();
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.hasData()).toBe(false);
        expect(store.hasError()).toBe(false);
        expect(store.isEmpty()).toBe(true);
        done();
      });
    });
  });

  describe('Computed signals', () => {
    it('should calculate hasData correctly when there are data', (done) => {
      mockGetRegisteredUsersUseCase.execute.mockReturnValue(of(mockUsers));

      store.loadRegisteredUsers();

      setTimeout(() => {
        expect(store.hasData()).toBe(true);
        done();
      });
    });

    it('should calculate isEmpty correctly when there are no data and not loading', () => {
      expect(store.isEmpty()).toBe(true);
    });
  });
});
