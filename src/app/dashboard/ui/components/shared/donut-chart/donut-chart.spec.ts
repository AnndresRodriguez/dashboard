import { createTestingModule } from '../../../../../../testing/test-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonutChart } from './donut-chart';

describe('DonutChart', () => {
  let component: DonutChart;
  let fixture: ComponentFixture<DonutChart>;

  beforeEach(async () => {
    await createTestingModule([DonutChart]).compileComponents();

    fixture = TestBed.createComponent(DonutChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.valueLeft()).toBe(0);
    expect(component.valueRight()).toBe(0);
    expect(component.leftLabel()).toBe('');
    expect(component.rightLabel()).toBe('');
  });

  it('should calculate total users correctly with default values', () => {
    expect(component.totalUsers()).toBe(0);
  });

  it('should have chart option with correct structure', () => {
    const chartOption = component.chartOption;
    expect(chartOption).toBeDefined();
    expect(chartOption.series).toBeDefined();
    expect(Array.isArray(chartOption.series)).toBe(true);
  });

  it('should have computed totalUsers signal', () => {
    expect(component.totalUsers).toBeDefined();
    expect(typeof component.totalUsers).toBe('function');
  });

  it('should have input signals defined', () => {
    expect(component.valueLeft).toBeDefined();
    expect(component.valueRight).toBeDefined();
    expect(component.leftLabel).toBeDefined();
    expect(component.rightLabel).toBeDefined();
  });

  it('should have chart option property', () => {
    expect(component.chartOption).toBeDefined();
    expect(component.chartOption).toHaveProperty('series');
  });
});
