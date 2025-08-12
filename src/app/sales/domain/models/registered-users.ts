import { RegisteredUsersResponse } from '../interfaces/registered-users.interface';

export class RegisteredUsers {
  constructor(
    public totalUsers: number,
    public premiumUsers: number,
    public basicUsers: number,
    public title = 'Registered Users',
  ) {}

  get premiumUsersPercentage(): number {
    return (this.premiumUsers / this.totalUsers) * 100;
  }

  get basicUsersPercentage(): number {
    return (this.basicUsers / this.totalUsers) * 100;
  }

  get premiumUsersRatio(): number {
    return this.premiumUsers / this.totalUsers;
  }

  get basicUsersRatio(): number {
    return this.basicUsers / this.totalUsers;
  }

  static fromApiResponse(response: RegisteredUsersResponse): RegisteredUsers {
    const { registeredUsers } = response;
    return new RegisteredUsers(
      registeredUsers.totalUsers,
      registeredUsers.premiumUsers,
      registeredUsers.basicUsers,
      registeredUsers.title || 'Registered Users',
    );
  }
}
