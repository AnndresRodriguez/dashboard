import { TestBed } from '@angular/core/testing';
import { GetRegisteredUsersUseCase } from '../get-registered-users.usecase';
import { RegisteredUsersPort } from '../../../domain/ports/registered-users.port';
import { Users } from '../../../domain/models/registered-users';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

describe('GetRegisteredUsersUseCase', () => {
  let useCase: GetRegisteredUsersUseCase;
  let mockRegisteredUsersPort: jest.Mocked<RegisteredUsersPort>;

  const mockUsersData: Users = new Users(1250, 1000, 250);

  beforeEach(() => {
    const mockPort = {
      getRegisteredUsers: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GetRegisteredUsersUseCase,
        { provide: RegisteredUsersPort, useValue: mockPort },
      ],
    });

    useCase = TestBed.inject(GetRegisteredUsersUseCase);
    mockRegisteredUsersPort = TestBed.inject(
      RegisteredUsersPort,
    ) as jest.Mocked<RegisteredUsersPort>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute and return registered users data', (done) => {
    // Arrange
    mockRegisteredUsersPort.getRegisteredUsers.mockReturnValue(
      of(mockUsersData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(mockUsersData);
        expect(mockRegisteredUsersPort.getRegisteredUsers).toHaveBeenCalled();
        expect(data.total).toBe(1250);
        expect(data.premium).toBe(1000);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should call the port method when execute is called', () => {
    // Arrange
    mockRegisteredUsersPort.getRegisteredUsers.mockReturnValue(
      of(mockUsersData),
    );

    // Act
    useCase.execute();

    // Assert
    expect(mockRegisteredUsersPort.getRegisteredUsers).toHaveBeenCalled();
  });

  it('should handle zero users data', (done) => {
    // Arrange
    const zeroUsersData: Users = new Users(0, 0, 0);
    mockRegisteredUsersPort.getRegisteredUsers.mockReturnValue(
      of(zeroUsersData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toEqual(zeroUsersData);
        expect(data.total).toBe(0);
        expect(data.premium).toBe(0);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should handle percentage calculations', (done) => {
    // Arrange
    mockRegisteredUsersPort.getRegisteredUsers.mockReturnValue(
      of(mockUsersData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data.premiumUsersPercentage).toBe(80);
        expect(data.basicUsersPercentage).toBe(20);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should propagate errors from the port', (done) => {
    // Arrange
    const errorMessage = 'Failed to fetch registered users';
    mockRegisteredUsersPort.getRegisteredUsers.mockReturnValue(
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

  it('should return users data with correct structure', (done) => {
    // Arrange
    mockRegisteredUsersPort.getRegisteredUsers.mockReturnValue(
      of(mockUsersData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data).toHaveProperty('total');
        expect(data).toHaveProperty('premium');
        expect(data).toHaveProperty('basic');
        expect(typeof data.total).toBe('number');
        expect(typeof data.premium).toBe('number');
        expect(typeof data.basic).toBe('number');
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });

  it('should validate that premium + basic equals total', (done) => {
    // Arrange
    mockRegisteredUsersPort.getRegisteredUsers.mockReturnValue(
      of(mockUsersData),
    );

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (data) => {
        expect(data.premium + data.basic).toBe(data.total);
        done();
      },
      error: (error) => {
        fail('Should not have thrown an error: ' + error);
      },
    });
  });
});
