export class Users {
  constructor(
    public total: number,
    public premium: number,
    public basic: number,
  ) {}

  get premiumUsersPercentage(): number {
    return (this.premium / this.total) * 100;
  }

  get basicUsersPercentage(): number {
    return (this.basic / this.total) * 100;
  }

  get premiumUsersRatio(): number {
    return this.premium / this.total;
  }

  get basicUsersRatio(): number {
    return this.basic / this.total;
  }
}
