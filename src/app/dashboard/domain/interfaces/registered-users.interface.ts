export interface RegisteredUsersData {
  totalUsers: number;
  premiumUsers: number;
  basicUsers: number;
  title?: string;
}

export interface RegisteredUsersResponse {
  registeredUsers: RegisteredUsersData;
}
