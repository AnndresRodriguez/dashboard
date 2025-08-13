import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RegisteredUsersAdapter } from '../registered-users.adapter';
import { Users } from '../../../domain/models/registered-users';
import { RegisteredUsersDTO } from '../../dtos/api.response';
import { APP_ENV } from '../../../../core/providers';

describe('RegisteredUsersAdapter', () => {
  let adapter: RegisteredUsersAdapter;
  let httpMock: HttpTestingController;
  let mockEnv: { apiUrl: string; production: boolean };

  const mockUsers = new Users(1250, 450, 800);

  const mockApiResponse: RegisteredUsersDTO = {
    users: mockUsers,
  };

  beforeEach(() => {
    mockEnv = {
      apiUrl: 'https://api.example.com',
      production: false,
    };

    TestBed.configureTestingModule({
      providers: [
        RegisteredUsersAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: APP_ENV,
          useValue: mockEnv,
        },
      ],
    });

    adapter = TestBed.inject(RegisteredUsersAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getRegisteredUsers', () => {
    it('should fetch registered users successfully', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe({
        next: (users) => {
          expect(users).toEqual(mockUsers);
          expect(users).toBeInstanceOf(Users);
          expect(users.total).toBe(1250);
          expect(users.premium).toBe(450);
          expect(users.basic).toBe(800);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle zero users data', (done) => {
      const zeroUsers = new Users(0, 0, 0);
      const zeroResponse: RegisteredUsersDTO = { users: zeroUsers };
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe({
        next: (users) => {
          expect(users).toEqual(zeroUsers);
          expect(users.total).toBe(0);
          expect(users.premium).toBe(0);
          expect(users.basic).toBe(0);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(zeroResponse);
    });

    it('should handle HTTP error responses', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;
      const errorMessage = 'Server error';

      adapter.getRegisteredUsers().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe({
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
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;
      const malformedResponse = { invalidField: 'invalid data' };

      adapter.getRegisteredUsers().subscribe({
        next: (users) => {
          expect(users).toBeUndefined();
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(malformedResponse);
    });

    it('should use correct HTTP method and headers', () => {
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Content-Type')).toBeNull();
    });

    it('should transform API response correctly', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe({
        next: (users) => {
          expect(users).toBeDefined();
          expect(users).toBeInstanceOf(Users);
          expect(users).toHaveProperty('total');
          expect(users).toHaveProperty('premium');
          expect(users).toHaveProperty('basic');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should maintain Users instance methods after transformation', (done) => {
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe({
        next: (users) => {
          // Test instance methods
          expect(typeof users.premiumUsersPercentage).toBe('number');
          expect(typeof users.basicUsersPercentage).toBe('number');
          expect(typeof users.premiumUsersRatio).toBe('number');
          expect(typeof users.basicUsersRatio).toBe('number');

          // Test method functionality
          expect(users.premiumUsersPercentage).toBe(36);
          expect(users.basicUsersPercentage).toBe(64);
          expect(users.premiumUsersRatio).toBe(0.36);
          expect(users.basicUsersRatio).toBe(0.64);

          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(mockApiResponse);
    });

    it('should handle edge case with only premium users', (done) => {
      const premiumOnlyUsers = new Users(100, 100, 0);
      const premiumResponse: RegisteredUsersDTO = { users: premiumOnlyUsers };
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe({
        next: (users) => {
          expect(users.premiumUsersPercentage).toBe(100);
          expect(users.basicUsersPercentage).toBe(0);
          expect(users.premiumUsersRatio).toBe(1);
          expect(users.basicUsersRatio).toBe(0);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(premiumResponse);
    });

    it('should handle edge case with only basic users', (done) => {
      const basicOnlyUsers = new Users(100, 0, 100);
      const basicResponse: RegisteredUsersDTO = { users: basicOnlyUsers };
      const expectedUrl = `${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`;

      adapter.getRegisteredUsers().subscribe({
        next: (users) => {
          expect(users.premiumUsersPercentage).toBe(0);
          expect(users.basicUsersPercentage).toBe(100);
          expect(users.premiumUsersRatio).toBe(0);
          expect(users.basicUsersRatio).toBe(1);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(basicResponse);
    });
  });

  describe('RegisteredUsersAdapter implementation', () => {
    it('should implement RegisteredUsersPort interface', () => {
      expect(adapter).toBeDefined();
      expect(typeof adapter.getRegisteredUsers).toBe('function');
    });

    it('should have correct ID_JSON_REGISTERED_USERS constant', () => {
      const result = adapter.getRegisteredUsers();
      expect(result).toBeDefined();

      // Verify the URL is constructed correctly by checking the HTTP request
      result.subscribe();
      const req = httpMock.expectOne(`${mockEnv.apiUrl}/c/e3d8-2efc-4e24-a7bc`);
      req.flush(mockApiResponse);
    });
  });
});
