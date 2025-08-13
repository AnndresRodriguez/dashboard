import { SaleRegion } from '../sales-region';
import { Region } from '../../interfaces/stats-region.interface';

describe('SaleRegion', () => {
  let saleRegion: SaleRegion;

  beforeEach(() => {
    saleRegion = new SaleRegion('North America', 250000);
  });

  describe('Constructor', () => {
    it('should create a sale region with correct values', () => {
      expect(saleRegion.name).toBe('North America');
      expect(saleRegion.value).toBe(250000);
    });

    it('should handle zero value', () => {
      const zeroRegion = new SaleRegion('Europe', 0);
      expect(zeroRegion.name).toBe('Europe');
      expect(zeroRegion.value).toBe(0);
    });

    it('should handle negative value', () => {
      const negativeRegion = new SaleRegion('Asia', -50000);
      expect(negativeRegion.name).toBe('Asia');
      expect(negativeRegion.value).toBe(-50000);
    });

    it('should handle large numbers', () => {
      const largeRegion = new SaleRegion('Global', 999999999);
      expect(largeRegion.name).toBe('Global');
      expect(largeRegion.value).toBe(999999999);
    });

    it('should handle decimal values', () => {
      const decimalRegion = new SaleRegion('South America', 125000.75);
      expect(decimalRegion.name).toBe('South America');
      expect(decimalRegion.value).toBe(125000.75);
    });

    it('should handle empty string name', () => {
      const emptyNameRegion = new SaleRegion('', 100000);
      expect(emptyNameRegion.name).toBe('');
      expect(emptyNameRegion.value).toBe(100000);
    });

    it('should handle special characters in name', () => {
      const specialNameRegion = new SaleRegion('Asia-Pacific & Europe', 150000);
      expect(specialNameRegion.name).toBe('Asia-Pacific & Europe');
      expect(specialNameRegion.value).toBe(150000);
    });

    it('should handle very long region names', () => {
      const longNameRegion = new SaleRegion(
        'Very Long Region Name That Exceeds Normal Length Expectations',
        200000,
      );
      expect(longNameRegion.name).toBe(
        'Very Long Region Name That Exceeds Normal Length Expectations',
      );
      expect(longNameRegion.value).toBe(200000);
    });
  });

  describe('Getters', () => {
    it('should return correct region name', () => {
      expect(saleRegion.getRegion()).toBe('North America');
    });

    it('should return correct value', () => {
      expect(saleRegion.getValue()).toBe(250000);
    });

    it('should return empty string for empty name', () => {
      const emptyNameRegion = new SaleRegion('', 100000);
      expect(emptyNameRegion.getRegion()).toBe('');
    });

    it('should return zero for zero value', () => {
      const zeroValueRegion = new SaleRegion('Europe', 0);
      expect(zeroValueRegion.getValue()).toBe(0);
    });

    it('should return negative value', () => {
      const negativeValueRegion = new SaleRegion('Asia', -50000);
      expect(negativeValueRegion.getValue()).toBe(-50000);
    });

    it('should return decimal value', () => {
      const decimalValueRegion = new SaleRegion('South America', 125000.75);
      expect(decimalValueRegion.getValue()).toBe(125000.75);
    });
  });

  describe('Setters', () => {
    it('should set region name correctly', () => {
      saleRegion.setRegion('Europe');
      expect(saleRegion.name).toBe('Europe');
      expect(saleRegion.getRegion()).toBe('Europe');
    });

    it('should set value correctly', () => {
      saleRegion.setValue(300000);
      expect(saleRegion.value).toBe(300000);
      expect(saleRegion.getValue()).toBe(300000);
    });

    it('should set empty string name', () => {
      saleRegion.setRegion('');
      expect(saleRegion.name).toBe('');
      expect(saleRegion.getRegion()).toBe('');
    });

    it('should set zero value', () => {
      saleRegion.setValue(0);
      expect(saleRegion.value).toBe(0);
      expect(saleRegion.getValue()).toBe(0);
    });

    it('should set negative value', () => {
      saleRegion.setValue(-75000);
      expect(saleRegion.value).toBe(-75000);
      expect(saleRegion.getValue()).toBe(-75000);
    });

    it('should set decimal value', () => {
      saleRegion.setValue(175000.5);
      expect(saleRegion.value).toBe(175000.5);
      expect(saleRegion.getValue()).toBe(175000.5);
    });

    it('should set special characters in name', () => {
      saleRegion.setRegion('Asia-Pacific & Europe');
      expect(saleRegion.name).toBe('Asia-Pacific & Europe');
      expect(saleRegion.getRegion()).toBe('Asia-Pacific & Europe');
    });

    it('should handle rapid name changes', () => {
      saleRegion.setRegion('Europe');
      expect(saleRegion.getRegion()).toBe('Europe');

      saleRegion.setRegion('Asia');
      expect(saleRegion.getRegion()).toBe('Asia');

      saleRegion.setRegion('North America');
      expect(saleRegion.getRegion()).toBe('North America');
    });

    it('should handle rapid value changes', () => {
      saleRegion.setValue(100000);
      expect(saleRegion.getValue()).toBe(100000);

      saleRegion.setValue(200000);
      expect(saleRegion.getValue()).toBe(200000);

      saleRegion.setValue(300000);
      expect(saleRegion.getValue()).toBe(300000);
    });
  });

  describe('fromApiResponse', () => {
    it('should create SaleRegion from API response', () => {
      const apiResponse: Region = {
        name: 'Europe',
        value: 300000,
      };

      const region = SaleRegion.fromApiResponse(apiResponse);

      expect(region.name).toBe('Europe');
      expect(region.value).toBe(300000);
      expect(region.getRegion()).toBe('Europe');
      expect(region.getValue()).toBe(300000);
    });

    it('should handle API response with zero value', () => {
      const apiResponse: Region = {
        name: 'Asia',
        value: 0,
      };

      const region = SaleRegion.fromApiResponse(apiResponse);

      expect(region.name).toBe('Asia');
      expect(region.value).toBe(0);
    });

    it('should handle API response with negative value', () => {
      const apiResponse: Region = {
        name: 'South America',
        value: -25000,
      };

      const region = SaleRegion.fromApiResponse(apiResponse);

      expect(region.name).toBe('South America');
      expect(region.value).toBe(-25000);
    });

    it('should handle API response with decimal value', () => {
      const apiResponse: Region = {
        name: 'Africa',
        value: 75000.25,
      };

      const region = SaleRegion.fromApiResponse(apiResponse);

      expect(region.name).toBe('Africa');
      expect(region.value).toBe(75000.25);
    });

    it('should handle API response with empty name', () => {
      const apiResponse: Region = {
        name: '',
        value: 100000,
      };

      const region = SaleRegion.fromApiResponse(apiResponse);

      expect(region.name).toBe('');
      expect(region.value).toBe(100000);
    });

    it('should handle API response with large numbers', () => {
      const apiResponse: Region = {
        name: 'Global',
        value: 999999999,
      };

      const region = SaleRegion.fromApiResponse(apiResponse);

      expect(region.name).toBe('Global');
      expect(region.value).toBe(999999999);
    });

    it('should handle API response with special characters', () => {
      const apiResponse: Region = {
        name: 'Asia-Pacific & Europe',
        value: 150000,
      };

      const region = SaleRegion.fromApiResponse(apiResponse);

      expect(region.name).toBe('Asia-Pacific & Europe');
      expect(region.value).toBe(150000);
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      const largeRegion = new SaleRegion('Global', 999999999999);
      expect(largeRegion.getValue()).toBe(999999999999);
      expect(largeRegion.getRegion()).toBe('Global');
    });

    it('should handle very small numbers', () => {
      const smallRegion = new SaleRegion('Local', 0.001);
      expect(smallRegion.getValue()).toBe(0.001);
      expect(smallRegion.getRegion()).toBe('Local');
    });

    it('should handle very long region names', () => {
      const longName =
        'This is a very long region name that contains many characters and should be handled properly by the system without any issues';
      const longNameRegion = new SaleRegion(longName, 100000);
      expect(longNameRegion.getRegion()).toBe(longName);
      expect(longNameRegion.getValue()).toBe(100000);
    });

    it('should handle unicode characters in names', () => {
      const unicodeRegion = new SaleRegion('América Latina', 125000);
      expect(unicodeRegion.getRegion()).toBe('América Latina');
      expect(unicodeRegion.getValue()).toBe(125000);
    });

    it('should handle numbers in region names', () => {
      const numberRegion = new SaleRegion('Region 123', 75000);
      expect(numberRegion.getRegion()).toBe('Region 123');
      expect(numberRegion.getValue()).toBe(75000);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle continental regions', () => {
      const northAmerica = new SaleRegion('North America', 500000);
      const europe = new SaleRegion('Europe', 400000);
      const asia = new SaleRegion('Asia', 600000);

      expect(northAmerica.getRegion()).toBe('North America');
      expect(northAmerica.getValue()).toBe(500000);
      expect(europe.getRegion()).toBe('Europe');
      expect(europe.getValue()).toBe(400000);
      expect(asia.getRegion()).toBe('Asia');
      expect(asia.getValue()).toBe(600000);
    });

    it('should handle country-specific regions', () => {
      const usa = new SaleRegion('United States', 300000);
      const germany = new SaleRegion('Germany', 150000);
      const japan = new SaleRegion('Japan', 200000);

      expect(usa.getRegion()).toBe('United States');
      expect(usa.getValue()).toBe(300000);
      expect(germany.getRegion()).toBe('Germany');
      expect(germany.getValue()).toBe(150000);
      expect(japan.getRegion()).toBe('Japan');
      expect(japan.getValue()).toBe(200000);
    });

    it('should handle regional groupings', () => {
      const apac = new SaleRegion('Asia-Pacific', 450000);
      const emea = new SaleRegion('EMEA', 350000);
      const americas = new SaleRegion('Americas', 400000);

      expect(apac.getRegion()).toBe('Asia-Pacific');
      expect(apac.getValue()).toBe(450000);
      expect(emea.getRegion()).toBe('EMEA');
      expect(emea.getValue()).toBe(350000);
      expect(americas.getRegion()).toBe('Americas');
      expect(americas.getValue()).toBe(400000);
    });
  });

  describe('Method interactions', () => {
    it('should maintain state after multiple setter calls', () => {
      saleRegion.setRegion('Europe');
      saleRegion.setValue(300000);

      expect(saleRegion.getRegion()).toBe('Europe');
      expect(saleRegion.getValue()).toBe(300000);

      saleRegion.setRegion('Asia');
      saleRegion.setValue(400000);

      expect(saleRegion.getRegion()).toBe('Asia');
      expect(saleRegion.getValue()).toBe(400000);
    });

    it('should handle mixed operations', () => {
      // Initial state
      expect(saleRegion.getRegion()).toBe('North America');
      expect(saleRegion.getValue()).toBe(250000);

      // Change value first
      saleRegion.setValue(350000);
      expect(saleRegion.getRegion()).toBe('North America');
      expect(saleRegion.getValue()).toBe(350000);

      // Then change region
      saleRegion.setRegion('Europe');
      expect(saleRegion.getRegion()).toBe('Europe');
      expect(saleRegion.getValue()).toBe(350000);

      // Change both
      saleRegion.setRegion('Asia');
      saleRegion.setValue(500000);
      expect(saleRegion.getRegion()).toBe('Asia');
      expect(saleRegion.getValue()).toBe(500000);
    });
  });
});
