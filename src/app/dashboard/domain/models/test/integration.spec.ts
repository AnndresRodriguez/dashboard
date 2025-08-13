import { Integration } from '../integration';

describe('Integration', () => {
  let integration: Integration;

  beforeEach(() => {
    integration = new Integration(
      '1',
      'Test App',
      'test-logo.png',
      'API',
      75,
      1500.5,
    );
  });

  describe('Constructor', () => {
    it('should create an integration with default isSelected as false', () => {
      expect(integration.id).toBe('1');
      expect(integration.application).toBe('Test App');
      expect(integration.logo).toBe('test-logo.png');
      expect(integration.type).toBe('API');
      expect(integration.rate).toBe(75);
      expect(integration.profit).toBe(1500.5);
      expect(integration.isSelected).toBe(false);
    });

    it('should create an integration with custom isSelected value', () => {
      const selectedIntegration = new Integration(
        '2',
        'Another App',
        'another-logo.png',
        'Webhook',
        90,
        2500.75,
        true,
      );

      expect(selectedIntegration.isSelected).toBe(true);
    });
  });

  describe('formattedProfit', () => {
    it('should format profit as USD currency', () => {
      expect(integration.formattedProfit).toBe('$1,500.50');
    });

    it('should format zero profit correctly', () => {
      const zeroProfitIntegration = new Integration(
        '3',
        'App',
        'logo.png',
        'Type',
        50,
        0,
      );
      expect(zeroProfitIntegration.formattedProfit).toBe('$0.00');
    });

    it('should format large profit numbers correctly', () => {
      const largeProfitIntegration = new Integration(
        '4',
        'App',
        'logo.png',
        'Type',
        50,
        1234567.89,
      );
      expect(largeProfitIntegration.formattedProfit).toBe('$1,234,567.89');
    });
  });

  describe('formattedRate', () => {
    it('should format rate with percentage symbol', () => {
      expect(integration.formattedRate).toBe('75%');
    });

    it('should format zero rate correctly', () => {
      const zeroRateIntegration = new Integration(
        '5',
        'App',
        'logo.png',
        'Type',
        0,
        100,
      );
      expect(zeroRateIntegration.formattedRate).toBe('0%');
    });

    it('should format 100 rate correctly', () => {
      const fullRateIntegration = new Integration(
        '6',
        'App',
        'logo.png',
        'Type',
        100,
        100,
      );
      expect(fullRateIntegration.formattedRate).toBe('100%');
    });
  });

  describe('rateProgress', () => {
    it('should return rate as decimal for progress calculation', () => {
      expect(integration.rateProgress).toBe(0.75);
    });

    it('should return 0 for zero rate', () => {
      const zeroRateIntegration = new Integration(
        '7',
        'App',
        'logo.png',
        'Type',
        0,
        100,
      );
      expect(zeroRateIntegration.rateProgress).toBe(0);
    });

    it('should return 1 for 100 rate', () => {
      const fullRateIntegration = new Integration(
        '8',
        'App',
        'logo.png',
        'Type',
        100,
        100,
      );
      expect(fullRateIntegration.rateProgress).toBe(1);
    });

    it('should return correct decimal for fractional rate', () => {
      const fractionalRateIntegration = new Integration(
        '9',
        'App',
        'logo.png',
        'Type',
        33,
        100,
      );
      expect(fractionalRateIntegration.rateProgress).toBe(0.33);
    });
  });

  describe('toggleSelection', () => {
    it('should toggle isSelected from false to true', () => {
      expect(integration.isSelected).toBe(false);
      integration.toggleSelection();
      expect(integration.isSelected).toBe(true);
    });

    it('should toggle isSelected from true to false', () => {
      const selectedIntegration = new Integration(
        '10',
        'App',
        'logo.png',
        'Type',
        50,
        100,
        true,
      );
      expect(selectedIntegration.isSelected).toBe(true);
      selectedIntegration.toggleSelection();
      expect(selectedIntegration.isSelected).toBe(false);
    });

    it('should toggle multiple times correctly', () => {
      expect(integration.isSelected).toBe(false);
      integration.toggleSelection();
      expect(integration.isSelected).toBe(true);
      integration.toggleSelection();
      expect(integration.isSelected).toBe(false);
      integration.toggleSelection();
      expect(integration.isSelected).toBe(true);
    });
  });

  describe('setSelected', () => {
    it('should set isSelected to true', () => {
      expect(integration.isSelected).toBe(false);
      integration.setSelected(true);
      expect(integration.isSelected).toBe(true);
    });

    it('should set isSelected to false', () => {
      const selectedIntegration = new Integration(
        '11',
        'App',
        'logo.png',
        'Type',
        50,
        100,
        true,
      );
      expect(selectedIntegration.isSelected).toBe(true);
      selectedIntegration.setSelected(false);
      expect(selectedIntegration.isSelected).toBe(false);
    });

    it('should maintain current state when setting to same value', () => {
      expect(integration.isSelected).toBe(false);
      integration.setSelected(false);
      expect(integration.isSelected).toBe(false);
    });
  });

  describe('updateRate', () => {
    it('should update rate to valid value', () => {
      expect(integration.rate).toBe(75);
      integration.updateRate(85);
      expect(integration.rate).toBe(85);
    });

    it('should clamp rate to minimum 0', () => {
      integration.updateRate(-10);
      expect(integration.rate).toBe(0);
    });

    it('should clamp rate to maximum 100', () => {
      integration.updateRate(150);
      expect(integration.rate).toBe(100);
    });

    it('should allow rate at boundaries', () => {
      integration.updateRate(0);
      expect(integration.rate).toBe(0);

      integration.updateRate(100);
      expect(integration.rate).toBe(100);
    });

    it('should handle decimal rates', () => {
      integration.updateRate(33.5);
      expect(integration.rate).toBe(33.5);
    });
  });

  describe('updateProfit', () => {
    it('should update profit to valid value', () => {
      expect(integration.profit).toBe(1500.5);
      integration.updateProfit(2000.75);
      expect(integration.profit).toBe(2000.75);
    });

    it('should clamp profit to minimum 0', () => {
      integration.updateProfit(-500);
      expect(integration.profit).toBe(0);
    });

    it('should allow zero profit', () => {
      integration.updateProfit(0);
      expect(integration.profit).toBe(0);
    });

    it('should allow large profit values', () => {
      integration.updateProfit(999999.99);
      expect(integration.profit).toBe(999999.99);
    });

    it('should handle decimal profits', () => {
      integration.updateProfit(1234.56);
      expect(integration.profit).toBe(1234.56);
    });
  });

  describe('Integration with different scenarios', () => {
    it('should handle complete integration lifecycle', () => {
      const lifecycleIntegration = new Integration(
        'lifecycle-1',
        'Lifecycle App',
        'lifecycle-logo.png',
        'Full Integration',
        25,
        500.0,
      );

      // Initial state
      expect(lifecycleIntegration.rate).toBe(25);
      expect(lifecycleIntegration.profit).toBe(500.0);
      expect(lifecycleIntegration.isSelected).toBe(false);
      expect(lifecycleIntegration.formattedRate).toBe('25%');
      expect(lifecycleIntegration.formattedProfit).toBe('$500.00');
      expect(lifecycleIntegration.rateProgress).toBe(0.25);

      // Update properties
      lifecycleIntegration.updateRate(75);
      lifecycleIntegration.updateProfit(1500.75);
      lifecycleIntegration.setSelected(true);

      // Verify updates
      expect(lifecycleIntegration.rate).toBe(75);
      expect(lifecycleIntegration.profit).toBe(1500.75);
      expect(lifecycleIntegration.isSelected).toBe(true);
      expect(lifecycleIntegration.formattedRate).toBe('75%');
      expect(lifecycleIntegration.formattedProfit).toBe('$1,500.75');
      expect(lifecycleIntegration.rateProgress).toBe(0.75);

      // Toggle selection
      lifecycleIntegration.toggleSelection();
      expect(lifecycleIntegration.isSelected).toBe(false);
    });
  });
});
