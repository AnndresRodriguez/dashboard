import { createBaseLineChartConfig } from './line-chart.config';
import { EChartsOption } from 'echarts';

describe('LineChartConfig', () => {
  describe('createBaseLineChartConfig', () => {
    describe('YAxis Formatter Function', () => {
      let config: EChartsOption;
      let formatter: (value: number) => string;

      beforeEach(() => {
        config = createBaseLineChartConfig();
        // Si yAxis es un array, tomamos el primer elemento; si no, usamos el objeto directamente
        const yAxis = Array.isArray(config.yAxis)
          ? config.yAxis[0]
          : config.yAxis;
        formatter = yAxis?.axisLabel?.formatter as (value: number) => string;
      });

      it('should format zero value correctly', () => {
        const result = formatter(0);
        expect(result).toBe('$0');
      });

      it('should format 10000 value correctly', () => {
        const result = formatter(10000);
        expect(result).toBe('$10k');
      });

      it('should format 20000 value correctly', () => {
        const result = formatter(20000);
        expect(result).toBe('$20k');
      });

      it('should format 30000 value correctly', () => {
        const result = formatter(30000);
        expect(result).toBe('$30k');
      });

      it('should format values between intervals correctly', () => {
        expect(formatter(5000)).toBe('$5k');
        expect(formatter(15000)).toBe('$15k');
        expect(formatter(25000)).toBe('$25k');
      });

      it('should format decimal values correctly', () => {
        expect(formatter(1234)).toBe('$1.234k');
        expect(formatter(5678)).toBe('$5.678k');
        expect(formatter(12345)).toBe('$12.345k');
      });

      it('should format large values correctly', () => {
        expect(formatter(50000)).toBe('$50k');
        expect(formatter(100000)).toBe('$100k');
        expect(formatter(999999)).toBe('$999.999k');
      });

      it('should format small values correctly', () => {
        expect(formatter(1)).toBe('$0.001k');
        expect(formatter(100)).toBe('$0.1k');
        expect(formatter(999)).toBe('$0.999k');
      });

      it('should handle negative values correctly', () => {
        expect(formatter(-1000)).toBe('$-1k');
        expect(formatter(-10000)).toBe('$-10k');
        expect(formatter(-20000)).toBe('$-20k');
      });

      it('should handle edge case values', () => {
        expect(formatter(1)).toBe('$0.001k');
        expect(formatter(999)).toBe('$0.999k');
        expect(formatter(1001)).toBe('$1.001k');
      });

      it('should maintain consistent formatting for same values', () => {
        const value1 = formatter(15000);
        const value2 = formatter(15000);
        expect(value1).toBe(value2);
        expect(value1).toBe('$15k');
      });

      it('should handle all predefined interval values', () => {
        // Test all the specific cases mentioned in the formatter
        expect(formatter(0)).toBe('$0');
        expect(formatter(10000)).toBe('$10k');
        expect(formatter(20000)).toBe('$20k');
      });

      it('should handle values that are not predefined intervals', () => {
        // Test values that should use the default case
        expect(formatter(5000)).toBe('$5k');
        expect(formatter(15000)).toBe('$15k');
        expect(formatter(25000)).toBe('$25k');
        expect(formatter(30000)).toBe('$30k');
      });

      it('should format values with proper decimal precision', () => {
        expect(formatter(1234)).toBe('$1.234k');
        expect(formatter(5678)).toBe('$5.678k');
        expect(formatter(12345)).toBe('$12.345k');
        expect(formatter(123456)).toBe('$123.456k');
      });

      it('should handle zero and very small values', () => {
        expect(formatter(0)).toBe('$0');
        expect(formatter(1)).toBe('$0.001k');
        expect(formatter(10)).toBe('$0.01k');
        expect(formatter(100)).toBe('$0.1k');
      });

      it('should handle values at the boundary of intervals', () => {
        expect(formatter(9999)).toBe('$9.999k');
        expect(formatter(10001)).toBe('$10.001k');
        expect(formatter(19999)).toBe('$19.999k');
        expect(formatter(20001)).toBe('$20.001k');
      });
    });
  });
});
