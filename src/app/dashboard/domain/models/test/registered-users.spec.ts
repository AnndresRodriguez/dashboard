import { Users } from '../registered-users';

describe('Users', () => {
  let users: Users;

  beforeEach(() => {
    users = new Users(1000, 300, 700);
  });

  describe('Constructor', () => {
    it('should create users with correct values', () => {
      expect(users.total).toBe(1000);
      expect(users.premium).toBe(300);
      expect(users.basic).toBe(700);
    });

    it('should handle zero values', () => {
      const zeroUsers = new Users(0, 0, 0);
      expect(zeroUsers.total).toBe(0);
      expect(zeroUsers.premium).toBe(0);
      expect(zeroUsers.basic).toBe(0);
    });

    it('should handle large numbers', () => {
      const largeUsers = new Users(1000000, 250000, 750000);
      expect(largeUsers.total).toBe(1000000);
      expect(largeUsers.premium).toBe(250000);
      expect(largeUsers.basic).toBe(750000);
    });
  });

  describe('premiumUsersPercentage', () => {
    it('should calculate premium users percentage correctly', () => {
      expect(users.premiumUsersPercentage).toBe(30);
    });

    it('should return 0 when no premium users', () => {
      const noPremiumUsers = new Users(1000, 0, 1000);
      expect(noPremiumUsers.premiumUsersPercentage).toBe(0);
    });

    it('should return 100 when all users are premium', () => {
      const allPremiumUsers = new Users(1000, 1000, 0);
      expect(allPremiumUsers.premiumUsersPercentage).toBe(100);
    });

    it('should handle small numbers', () => {
      const smallUsers = new Users(10, 3, 7);
      expect(smallUsers.premiumUsersPercentage).toBe(30);
    });
  });

  describe('basicUsersPercentage', () => {
    it('should calculate basic users percentage correctly', () => {
      expect(users.basicUsersPercentage).toBe(70);
    });

    it('should return 0 when no basic users', () => {
      const noBasicUsers = new Users(1000, 1000, 0);
      expect(noBasicUsers.basicUsersPercentage).toBe(0);
    });

    it('should return 100 when all users are basic', () => {
      const allBasicUsers = new Users(1000, 0, 1000);
      expect(allBasicUsers.basicUsersPercentage).toBe(100);
    });

    it('should handle decimal percentages', () => {
      const decimalUsers = new Users(1000, 333, 667);
      expect(decimalUsers.basicUsersPercentage).toBe(66.7);
    });

    it('should handle small numbers', () => {
      const smallUsers = new Users(10, 3, 7);
      expect(smallUsers.basicUsersPercentage).toBe(70);
    });
  });

  describe('premiumUsersRatio', () => {
    it('should calculate premium users ratio correctly', () => {
      expect(users.premiumUsersRatio).toBe(0.3);
    });

    it('should return 0 when no premium users', () => {
      const noPremiumUsers = new Users(1000, 0, 1000);
      expect(noPremiumUsers.premiumUsersRatio).toBe(0);
    });

    it('should return 1 when all users are premium', () => {
      const allPremiumUsers = new Users(1000, 1000, 0);
      expect(allPremiumUsers.premiumUsersRatio).toBe(1);
    });

    it('should handle decimal ratios', () => {
      const decimalUsers = new Users(1000, 333, 667);
      expect(decimalUsers.premiumUsersRatio).toBe(0.333);
    });

    it('should handle small numbers', () => {
      const smallUsers = new Users(10, 3, 7);
      expect(smallUsers.premiumUsersRatio).toBe(0.3);
    });
  });

  describe('basicUsersRatio', () => {
    it('should calculate basic users ratio correctly', () => {
      expect(users.basicUsersRatio).toBe(0.7);
    });

    it('should return 0 when no basic users', () => {
      const noBasicUsers = new Users(1000, 1000, 0);
      expect(noBasicUsers.basicUsersRatio).toBe(0);
    });

    it('should return 1 when all users are basic', () => {
      const allBasicUsers = new Users(1000, 0, 1000);
      expect(allBasicUsers.basicUsersRatio).toBe(1);
    });

    it('should handle decimal ratios', () => {
      const decimalUsers = new Users(1000, 333, 667);
      expect(decimalUsers.basicUsersRatio).toBe(0.667);
    });

    it('should handle small numbers', () => {
      const smallUsers = new Users(10, 3, 7);
      expect(smallUsers.basicUsersRatio).toBe(0.7);
    });
  });

  describe('Mathematical consistency', () => {
    it('should maintain percentage consistency', () => {
      expect(users.premiumUsersPercentage + users.basicUsersPercentage).toBe(
        100,
      );
    });

    it('should maintain ratio consistency', () => {
      expect(users.premiumUsersRatio + users.basicUsersRatio).toBe(1);
    });

    it('should maintain consistency with different user distributions', () => {
      const balancedUsers = new Users(1000, 500, 500);
      expect(
        balancedUsers.premiumUsersPercentage +
          balancedUsers.basicUsersPercentage,
      ).toBe(100);
      expect(
        balancedUsers.premiumUsersRatio + balancedUsers.basicUsersRatio,
      ).toBe(1);
    });

    it('should maintain consistency with uneven distributions', () => {
      const unevenUsers = new Users(1000, 250, 750);
      expect(
        unevenUsers.premiumUsersPercentage + unevenUsers.basicUsersPercentage,
      ).toBe(100);
      expect(unevenUsers.premiumUsersRatio + unevenUsers.basicUsersRatio).toBe(
        1,
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle single user scenarios', () => {
      const singlePremiumUser = new Users(1, 1, 0);
      expect(singlePremiumUser.premiumUsersPercentage).toBe(100);
      expect(singlePremiumUser.premiumUsersRatio).toBe(1);
      expect(singlePremiumUser.basicUsersPercentage).toBe(0);
      expect(singlePremiumUser.basicUsersRatio).toBe(0);

      const singleBasicUser = new Users(1, 0, 1);
      expect(singleBasicUser.premiumUsersPercentage).toBe(0);
      expect(singleBasicUser.premiumUsersRatio).toBe(0);
      expect(singleBasicUser.basicUsersPercentage).toBe(100);
      expect(singleBasicUser.basicUsersRatio).toBe(1);
    });

    it('should handle very large numbers', () => {
      const largeUsers = new Users(1000000000, 300000000, 700000000);
      expect(largeUsers.premiumUsersPercentage).toBe(30);
      expect(largeUsers.basicUsersPercentage).toBe(70);
      expect(largeUsers.premiumUsersRatio).toBe(0.3);
      expect(largeUsers.basicUsersRatio).toBe(0.7);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical SaaS user distribution', () => {
      const saasUsers = new Users(10000, 1500, 8500);
      expect(saasUsers.premiumUsersPercentage).toBe(15);
      expect(saasUsers.basicUsersPercentage).toBe(85);
      expect(saasUsers.premiumUsersRatio).toBe(0.15);
      expect(saasUsers.basicUsersRatio).toBe(0.85);
    });

    it('should handle enterprise user distribution', () => {
      const enterpriseUsers = new Users(50000, 45000, 5000);
      expect(enterpriseUsers.premiumUsersPercentage).toBe(90);
      expect(enterpriseUsers.basicUsersPercentage).toBe(10);
      expect(enterpriseUsers.premiumUsersRatio).toBe(0.9);
      expect(enterpriseUsers.basicUsersRatio).toBe(0.1);
    });

    it('should handle startup user distribution', () => {
      const startupUsers = new Users(100, 10, 90);
      expect(startupUsers.premiumUsersPercentage).toBe(10);
      expect(startupUsers.basicUsersPercentage).toBe(90);
      expect(startupUsers.premiumUsersRatio).toBe(0.1);
      expect(startupUsers.basicUsersRatio).toBe(0.9);
    });
  });
});
