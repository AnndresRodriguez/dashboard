export interface RegisteredUsersData {
  total: number;
  premium: number;
  basic: number;
}

export interface RegisteredUsersResponse {
  users: RegisteredUsersData;
}
