import { SalesOverview } from '../sales-overview';
import {
  SalesDataPoint,
  SalesOverviewResponse,
} from '../../interfaces/sales-overview.interface';

describe('SalesOverview', () => {
  let salesOverview: SalesOverview;
  let mockData: SalesDataPoint[];

  beforeEach(() => {
    mockData = [
      { month: 'Jan', revenue: 50000, target: 50000 },
      { month: 'Feb', revenue: 60000, target: 60000 },
      { month: 'Mar', revenue: 75000, target: 75000 },
    ];

    salesOverview = new SalesOverview(185000, 200000, mockData);
  });

  describe('Constructor', () => {
    it('should create a sales overview with correct values', () => {
      expect(salesOverview.totalRevenue).toBe(185000);
      expect(salesOverview.totalTarget).toBe(200000);
      expect(salesOverview.data).toEqual(mockData);
    });

    it('should handle zero values', () => {
      const zeroOverview = new SalesOverview(0, 0, []);
      expect(zeroOverview.totalRevenue).toBe(0);
      expect(zeroOverview.totalTarget).toBe(0);
      expect(zeroOverview.data).toEqual([]);
    });

    it('should handle large numbers', () => {
      const largeOverview = new SalesOverview(5000000, 6000000, mockData);
      expect(largeOverview.totalRevenue).toBe(5000000);
      expect(largeOverview.totalTarget).toBe(6000000);
    });

    it('should handle empty data array', () => {
      const emptyDataOverview = new SalesOverview(100000, 150000, []);
      expect(emptyDataOverview.data).toEqual([]);
    });

    it('should handle single data point', () => {
      const singleDataPoint = [
        { month: 'Jan', revenue: 100000, target: 100000 },
      ];
      const singleOverview = new SalesOverview(100000, 120000, singleDataPoint);
      expect(singleOverview.data).toEqual(singleDataPoint);
    });
  });

  describe('revenueTargetRatio', () => {
    it('should calculate revenue target ratio correctly', () => {
      expect(salesOverview.revenueTargetRatio).toBe(0.925);
    });

    it('should return 1 when revenue equals target', () => {
      const equalOverview = new SalesOverview(200000, 200000, mockData);
      expect(equalOverview.revenueTargetRatio).toBe(1);
    });

    it('should return greater than 1 when revenue exceeds target', () => {
      const exceededOverview = new SalesOverview(250000, 200000, mockData);
      expect(exceededOverview.revenueTargetRatio).toBe(1.25);
    });

    it('should return 0 when revenue is 0', () => {
      const zeroRevenueOverview = new SalesOverview(0, 200000, mockData);
      expect(zeroRevenueOverview.revenueTargetRatio).toBe(0);
    });

    it('should handle zero target', () => {
      const zeroTargetOverview = new SalesOverview(100000, 0, mockData);
      expect(zeroTargetOverview.revenueTargetRatio).toBe(Infinity);
    });

    it('should handle both zero revenue and target', () => {
      const zeroBothOverview = new SalesOverview(0, 0, mockData);
      expect(zeroBothOverview.revenueTargetRatio).toBe(NaN);
    });

    it('should handle decimal values', () => {
      const decimalOverview = new SalesOverview(150000.5, 200000, mockData);
      expect(decimalOverview.revenueTargetRatio).toBe(0.7500025);
    });
  });

  describe('isTargetMet', () => {
    it('should return false when revenue is below target', () => {
      expect(salesOverview.isTargetMet).toBe(false);
    });

    it('should return true when revenue equals target', () => {
      const equalOverview = new SalesOverview(200000, 200000, mockData);
      expect(equalOverview.isTargetMet).toBe(true);
    });

    it('should return true when revenue exceeds target', () => {
      const exceededOverview = new SalesOverview(250000, 200000, mockData);
      expect(exceededOverview.isTargetMet).toBe(true);
    });

    it('should return false when revenue is 0', () => {
      const zeroRevenueOverview = new SalesOverview(0, 200000, mockData);
      expect(zeroRevenueOverview.isTargetMet).toBe(false);
    });

    it('should return true when target is 0 and revenue is positive', () => {
      const zeroTargetOverview = new SalesOverview(100000, 0, mockData);
      expect(zeroTargetOverview.isTargetMet).toBe(true);
    });

    it('should return true when both revenue and target are 0', () => {
      const zeroBothOverview = new SalesOverview(0, 0, mockData);
      expect(zeroBothOverview.isTargetMet).toBe(true);
    });
  });

  describe('targetGap', () => {
    it('should calculate target gap correctly when revenue is below target', () => {
      expect(salesOverview.targetGap).toBe(15000);
    });

    it('should return 0 when revenue equals target', () => {
      const equalOverview = new SalesOverview(200000, 200000, mockData);
      expect(equalOverview.targetGap).toBe(0);
    });

    it('should return negative value when revenue exceeds target', () => {
      const exceededOverview = new SalesOverview(250000, 200000, mockData);
      expect(exceededOverview.targetGap).toBe(-50000);
    });

    it('should return target value when revenue is 0', () => {
      const zeroRevenueOverview = new SalesOverview(0, 200000, mockData);
      expect(zeroRevenueOverview.targetGap).toBe(200000);
    });

    it('should return negative revenue when target is 0', () => {
      const zeroTargetOverview = new SalesOverview(100000, 0, mockData);
      expect(zeroTargetOverview.targetGap).toBe(-100000);
    });

    it('should return 0 when both revenue and target are 0', () => {
      const zeroBothOverview = new SalesOverview(0, 0, mockData);
      expect(zeroBothOverview.targetGap).toBe(0);
    });
  });

  describe('targetGapPercentage', () => {
    it('should calculate target gap percentage correctly', () => {
      expect(salesOverview.targetGapPercentage).toBe(7.5);
    });

    it('should return 0 when revenue equals target', () => {
      const equalOverview = new SalesOverview(200000, 200000, mockData);
      expect(equalOverview.targetGapPercentage).toBe(0);
    });

    it('should return negative percentage when revenue exceeds target', () => {
      const exceededOverview = new SalesOverview(250000, 200000, mockData);
      expect(exceededOverview.targetGapPercentage).toBe(-25);
    });

    it('should return 100 when revenue is 0', () => {
      const zeroRevenueOverview = new SalesOverview(0, 200000, mockData);
      expect(zeroRevenueOverview.targetGapPercentage).toBe(100);
    });

    it('should handle zero target', () => {
      const zeroTargetOverview = new SalesOverview(100000, 0, mockData);
      expect(zeroTargetOverview.targetGapPercentage).toBe(-Infinity);
    });

    it('should handle both zero revenue and target', () => {
      const zeroBothOverview = new SalesOverview(0, 0, mockData);
      expect(zeroBothOverview.targetGapPercentage).toBe(NaN);
    });
  });

  describe('Setters', () => {
    it('should set total revenue correctly', () => {
      salesOverview.setTotalRevenue(300000);
      expect(salesOverview.totalRevenue).toBe(300000);
    });

    it('should set total target correctly', () => {
      salesOverview.setTotalTarget(250000);
      expect(salesOverview.totalTarget).toBe(250000);
    });

    it('should set data correctly', () => {
      const newData: SalesDataPoint[] = [
        { month: 'Apr', revenue: 80000, target: 80000 },
        { month: 'May', revenue: 90000, target: 90000 },
      ];
      salesOverview.setData(newData);
      expect(salesOverview.data).toEqual(newData);
    });

    it('should handle setting zero values', () => {
      salesOverview.setTotalRevenue(0);
      salesOverview.setTotalTarget(0);
      expect(salesOverview.totalRevenue).toBe(0);
      expect(salesOverview.totalTarget).toBe(0);
    });

    it('should handle setting empty data array', () => {
      salesOverview.setData([]);
      expect(salesOverview.data).toEqual([]);
    });
  });

  describe('fromApiResponse', () => {
    it('should handle API response with zero values', () => {
      const apiResponse: SalesOverviewResponse = {
        salesOverview: {
          totalRevenue: 0,
          totalTarget: 0,
          data: [],
        },
      };

      const overview = SalesOverview.fromApiResponse(apiResponse);

      expect(overview.totalRevenue).toBe(0);
      expect(overview.totalTarget).toBe(0);
      expect(overview.data).toEqual([]);
    });

    it('should handle API response with large numbers', () => {
      const apiResponse: SalesOverviewResponse = {
        salesOverview: {
          totalRevenue: 5000000,
          totalTarget: 6000000,
          data: mockData,
        },
      };

      const overview = SalesOverview.fromApiResponse(apiResponse);

      expect(overview.totalRevenue).toBe(5000000);
      expect(overview.totalTarget).toBe(6000000);
      expect(overview.data).toEqual(mockData);
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      const largeOverview = new SalesOverview(
        999999999999,
        1000000000000,
        mockData,
      );
      expect(largeOverview.revenueTargetRatio).toBe(0.999999999999);
      expect(largeOverview.isTargetMet).toBe(false);
      expect(largeOverview.targetGap).toBe(1);
    });

    it('should handle very small numbers', () => {
      const smallOverview = new SalesOverview(0.001, 1, mockData);
      expect(smallOverview.revenueTargetRatio).toBe(0.001);
      expect(smallOverview.isTargetMet).toBe(false);
      expect(smallOverview.targetGap).toBe(0.999);
    });

    it('should handle negative revenue', () => {
      const negativeOverview = new SalesOverview(-50000, 200000, mockData);
      expect(negativeOverview.revenueTargetRatio).toBe(-0.25);
      expect(negativeOverview.isTargetMet).toBe(false);
      expect(negativeOverview.targetGap).toBe(250000);
      expect(negativeOverview.targetGapPercentage).toBe(125);
    });

    it('should handle negative target', () => {
      const negativeTargetOverview = new SalesOverview(
        100000,
        -50000,
        mockData,
      );
      expect(negativeTargetOverview.revenueTargetRatio).toBe(-2);
      expect(negativeTargetOverview.isTargetMet).toBe(true);
      expect(negativeTargetOverview.targetGap).toBe(-150000);
      expect(negativeTargetOverview.targetGapPercentage).toBe(300);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle quarterly sales overview', () => {
      const quarterlyData: SalesDataPoint[] = [
        { month: 'Q1', revenue: 150000, target: 150000 },
        { month: 'Q2', revenue: 180000, target: 180000 },
        { month: 'Q3', revenue: 220000, target: 220000 },
        { month: 'Q4', revenue: 250000, target: 250000 },
      ];

      const quarterlyOverview = new SalesOverview(
        800000,
        750000,
        quarterlyData,
      );

      expect(quarterlyOverview.revenueTargetRatio).toBe(1.0666666666666667);
      expect(quarterlyOverview.isTargetMet).toBe(true);
      expect(quarterlyOverview.targetGap).toBe(-50000);
      expect(quarterlyOverview.targetGapPercentage).toBe(-6.666666666666667);
    });

    it('should handle startup scenario with low revenue', () => {
      const startupData: SalesDataPoint[] = [
        { month: 'Jan', revenue: 5000, target: 5000 },
        { month: 'Feb', revenue: 8000, target: 8000 },
        { month: 'Mar', revenue: 12000, target: 12000 },
      ];

      const startupOverview = new SalesOverview(25000, 100000, startupData);

      expect(startupOverview.revenueTargetRatio).toBe(0.25);
      expect(startupOverview.isTargetMet).toBe(false);
      expect(startupOverview.targetGap).toBe(75000);
      expect(startupOverview.targetGapPercentage).toBe(75);
    });
  });

  describe('Method interactions', () => {
    it('should maintain consistency after setter calls', () => {
      salesOverview.setTotalRevenue(250000);
      salesOverview.setTotalTarget(200000);

      expect(salesOverview.revenueTargetRatio).toBe(1.25);
      expect(salesOverview.isTargetMet).toBe(true);
      expect(salesOverview.targetGap).toBe(-50000);
      expect(salesOverview.targetGapPercentage).toBe(-25);
    });

    it('should handle rapid state changes', () => {
      salesOverview.setTotalRevenue(100000);
      expect(salesOverview.revenueTargetRatio).toBe(0.5);

      salesOverview.setTotalRevenue(300000);
      expect(salesOverview.revenueTargetRatio).toBe(1.5);

      salesOverview.setTotalRevenue(200000);
      expect(salesOverview.revenueTargetRatio).toBe(1);
    });
  });
});
