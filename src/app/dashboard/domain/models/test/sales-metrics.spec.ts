import { SaleMetric } from '../sales-metrics';
import { SalesMetricResponse } from '../../interfaces/sales-metric.interface';

describe('SaleMetric', () => {
  let saleMetric: SaleMetric;

  beforeEach(() => {
    saleMetric = new SaleMetric(
      'Total Sales',
      125000,
      'USD',
      12.5,
      'up',
      'Sales increased by 12.5% compared to last month',
    );
  });

  describe('Constructor', () => {
    it('should create a sale metric with correct values', () => {
      expect(saleMetric.title).toBe('Total Sales');
      expect(saleMetric.value).toBe(125000);
      expect(saleMetric.currency).toBe('USD');
      expect(saleMetric.percentageChange).toBe(12.5);
      expect(saleMetric.changeType).toBe('up');
      expect(saleMetric.description).toBe(
        'Sales increased by 12.5% compared to last month',
      );
    });

    it('should handle different change types', () => {
      const downMetric = new SaleMetric(
        'Revenue',
        50000,
        'EUR',
        -5.2,
        'down',
        'Revenue decreased',
      );
      const equalMetric = new SaleMetric(
        'Orders',
        1000,
        'USD',
        0,
        'equal',
        'Orders remained the same',
      );

      expect(downMetric.changeType).toBe('down');
      expect(equalMetric.changeType).toBe('equal');
    });

    it('should handle zero values', () => {
      const zeroMetric = new SaleMetric(
        'No Sales',
        0,
        'USD',
        0,
        'equal',
        'No sales recorded',
      );
      expect(zeroMetric.value).toBe(0);
      expect(zeroMetric.percentageChange).toBe(0);
    });

    it('should handle negative values', () => {
      const negativeMetric = new SaleMetric(
        'Loss',
        -5000,
        'USD',
        -25.0,
        'down',
        'Loss recorded',
      );
      expect(negativeMetric.value).toBe(-5000);
      expect(negativeMetric.percentageChange).toBe(-25.0);
    });

    it('should handle different currencies', () => {
      const eurMetric = new SaleMetric(
        'Sales',
        100000,
        'EUR',
        8.3,
        'up',
        'Sales in EUR',
      );
      const gbpMetric = new SaleMetric(
        'Revenue',
        75000,
        'GBP',
        15.7,
        'up',
        'Revenue in GBP',
      );

      expect(eurMetric.currency).toBe('EUR');
      expect(gbpMetric.currency).toBe('GBP');
    });
  });

  describe('Getters', () => {
    it('should return correct title', () => {
      expect(saleMetric.getTitle()).toBe('Total Sales');
    });

    it('should return correct value', () => {
      expect(saleMetric.getValue()).toBe(125000);
    });

    it('should return correct currency', () => {
      expect(saleMetric.getCurrency()).toBe('USD');
    });

    it('should return correct percentage change', () => {
      expect(saleMetric.getPercentageChange()).toBe(12.5);
    });

    it('should return correct change type', () => {
      expect(saleMetric.getChangeType()).toBe('up');
    });

    it('should return correct description', () => {
      expect(saleMetric.getDescription()).toBe(
        'Sales increased by 12.5% compared to last month',
      );
    });
  });

  describe('Setters', () => {
    it('should set title correctly', () => {
      saleMetric.setTitle('New Sales Title');
      expect(saleMetric.title).toBe('New Sales Title');
      expect(saleMetric.getTitle()).toBe('New Sales Title');
    });

    it('should set value correctly', () => {
      saleMetric.setValue(150000);
      expect(saleMetric.value).toBe(150000);
      expect(saleMetric.getValue()).toBe(150000);
    });

    it('should set currency correctly', () => {
      saleMetric.setCurrency('EUR');
      expect(saleMetric.currency).toBe('EUR');
      expect(saleMetric.getCurrency()).toBe('EUR');
    });

    it('should set percentage change correctly', () => {
      saleMetric.setPercentageChange(20.5);
      expect(saleMetric.percentageChange).toBe(20.5);
      expect(saleMetric.getPercentageChange()).toBe(20.5);
    });

    it('should set change type correctly', () => {
      saleMetric.setChangeType('down');
      expect(saleMetric.changeType).toBe('down');
      expect(saleMetric.getChangeType()).toBe('down');

      saleMetric.setChangeType('equal');
      expect(saleMetric.changeType).toBe('equal');
      expect(saleMetric.getChangeType()).toBe('equal');
    });

    it('should set description correctly', () => {
      saleMetric.setDescription('Updated description');
      expect(saleMetric.description).toBe('Updated description');
      expect(saleMetric.getDescription()).toBe('Updated description');
    });

    it('should handle all change types', () => {
      saleMetric.setChangeType('up');
      expect(saleMetric.getChangeType()).toBe('up');

      saleMetric.setChangeType('down');
      expect(saleMetric.getChangeType()).toBe('down');

      saleMetric.setChangeType('equal');
      expect(saleMetric.getChangeType()).toBe('equal');
    });
  });

  describe('fromApiResponse', () => {
    it('should create SaleMetric from API response', () => {
      const apiResponse: SalesMetricResponse = {
        title: 'API Sales',
        value: 200000,
        currency: 'USD',
        percentageChange: 18.7,
        changeType: 'up',
        description: 'Sales from API response',
      };

      const metric = SaleMetric.fromApiResponse(apiResponse);

      expect(metric.title).toBe('API Sales');
      expect(metric.value).toBe(200000);
      expect(metric.currency).toBe('USD');
      expect(metric.percentageChange).toBe(18.7);
      expect(metric.changeType).toBe('up');
      expect(metric.description).toBe('Sales from API response');
    });

    it('should handle API response with down change type', () => {
      const apiResponse: SalesMetricResponse = {
        title: 'Revenue',
        value: 80000,
        currency: 'EUR',
        percentageChange: -12.3,
        changeType: 'down',
        description: 'Revenue decreased',
      };

      const metric = SaleMetric.fromApiResponse(apiResponse);

      expect(metric.changeType).toBe('down');
      expect(metric.percentageChange).toBe(-12.3);
    });

    it('should handle API response with equal change type', () => {
      const apiResponse: SalesMetricResponse = {
        title: 'Orders',
        value: 1500,
        currency: 'USD',
        percentageChange: 0,
        changeType: 'equal',
        description: 'Orders unchanged',
      };

      const metric = SaleMetric.fromApiResponse(apiResponse);

      expect(metric.changeType).toBe('equal');
      expect(metric.percentageChange).toBe(0);
    });

    it('should handle API response with zero values', () => {
      const apiResponse: SalesMetricResponse = {
        title: 'No Data',
        value: 0,
        currency: 'USD',
        percentageChange: 0,
        changeType: 'equal',
        description: 'No data available',
      };

      const metric = SaleMetric.fromApiResponse(apiResponse);

      expect(metric.value).toBe(0);
      expect(metric.percentageChange).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      const largeMetric = new SaleMetric(
        'Large Sales',
        999999999.99,
        'USD',
        999.99,
        'up',
        'Very large sales figure',
      );

      expect(largeMetric.value).toBe(999999999.99);
      expect(largeMetric.percentageChange).toBe(999.99);
    });

    it('should handle very small numbers', () => {
      const smallMetric = new SaleMetric(
        'Small Sales',
        0.01,
        'USD',
        0.001,
        'up',
        'Very small sales figure',
      );

      expect(smallMetric.value).toBe(0.01);
      expect(smallMetric.percentageChange).toBe(0.001);
    });

    it('should handle empty strings', () => {
      const emptyMetric = new SaleMetric('', 0, '', 0, 'equal', '');
      expect(emptyMetric.title).toBe('');
      expect(emptyMetric.currency).toBe('');
      expect(emptyMetric.description).toBe('');
    });

    it('should handle special characters in strings', () => {
      const specialMetric = new SaleMetric(
        'Sales & Revenue',
        50000,
        'USD',
        10.5,
        'up',
        'Sales with special chars: @#$%^&*()',
      );

      expect(specialMetric.title).toBe('Sales & Revenue');
      expect(specialMetric.description).toBe(
        'Sales with special chars: @#$%^&*()',
      );
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle e-commerce sales metric', () => {
      const ecommerceMetric = new SaleMetric(
        'Online Sales',
        450000,
        'USD',
        23.4,
        'up',
        'E-commerce sales increased by 23.4% this quarter',
      );

      expect(ecommerceMetric.getTitle()).toBe('Online Sales');
      expect(ecommerceMetric.getValue()).toBe(450000);
      expect(ecommerceMetric.getPercentageChange()).toBe(23.4);
      expect(ecommerceMetric.getChangeType()).toBe('up');
    });

    it('should handle subscription revenue metric', () => {
      const subscriptionMetric = new SaleMetric(
        'Monthly Recurring Revenue',
        125000,
        'USD',
        -2.1,
        'down',
        'MRR decreased by 2.1% due to churn',
      );

      expect(subscriptionMetric.getTitle()).toBe('Monthly Recurring Revenue');
      expect(subscriptionMetric.getValue()).toBe(125000);
      expect(subscriptionMetric.getPercentageChange()).toBe(-2.1);
      expect(subscriptionMetric.getChangeType()).toBe('down');
    });

    it('should handle international sales metric', () => {
      const internationalMetric = new SaleMetric(
        'International Revenue',
        75000,
        'EUR',
        0,
        'equal',
        'International revenue remained stable',
      );

      expect(internationalMetric.getTitle()).toBe('International Revenue');
      expect(internationalMetric.getCurrency()).toBe('EUR');
      expect(internationalMetric.getPercentageChange()).toBe(0);
      expect(internationalMetric.getChangeType()).toBe('equal');
    });
  });

  describe('Method chaining and state management', () => {
    it('should maintain state after multiple setter calls', () => {
      saleMetric.setTitle('Updated Title');
      saleMetric.setValue(200000);
      saleMetric.setCurrency('EUR');
      saleMetric.setPercentageChange(25.0);
      saleMetric.setChangeType('down');
      saleMetric.setDescription('Updated description');

      expect(saleMetric.getTitle()).toBe('Updated Title');
      expect(saleMetric.getValue()).toBe(200000);
      expect(saleMetric.getCurrency()).toBe('EUR');
      expect(saleMetric.getPercentageChange()).toBe(25.0);
      expect(saleMetric.getChangeType()).toBe('down');
      expect(saleMetric.getDescription()).toBe('Updated description');
    });

    it('should handle rapid state changes', () => {
      saleMetric.setValue(100000);
      expect(saleMetric.getValue()).toBe(100000);

      saleMetric.setValue(150000);
      expect(saleMetric.getValue()).toBe(150000);

      saleMetric.setValue(200000);
      expect(saleMetric.getValue()).toBe(200000);
    });
  });
});
