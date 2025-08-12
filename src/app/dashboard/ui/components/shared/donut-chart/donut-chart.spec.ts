import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';
import { DonutChart } from './donut-chart';

describe('DonutChart', () => {
  let component: DonutChart;
  let fixture: ComponentFixture<DonutChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutChart, NgxEchartsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DonutChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.value()).toBe(3201);
    expect(component.color()).toBe('#8B5CF6');
    expect(component.premiumUsers()).toBe(2804);
    expect(component.basicUsers()).toBe(397);
  });

  it('should calculate total users correctly', () => {
    expect(component.totalUsers()).toBe(2804 + 397);
  });

  it('should have chart option with correct structure', () => {
    const chartOption = component.chartOption();
    expect(chartOption).toBeDefined();
    expect(chartOption.series).toBeDefined();
    expect(Array.isArray(chartOption.series)).toBe(true);
  });

  it('should update value when updateValue is called', () => {
    const newValue = 4500;
    component.updateValue(newValue);

    expect(component.value()).toBe(newValue);
  });

  it('should update both value and color when updateChart is called', () => {
    const newValue = 3800;
    const newColor = '#3B82F6';

    component.updateChart(newValue, newColor);

    expect(component.value()).toBe(newValue);
    expect(component.color()).toBe(newColor);
  });

  it('should update users when updateUsers is called', () => {
    const newPremium = 3000;
    const newBasic = 500;

    component.updateUsers(newPremium, newBasic);

    expect(component.premiumUsers()).toBe(newPremium);
    expect(component.basicUsers()).toBe(newBasic);
    expect(component.totalUsers()).toBe(newPremium + newBasic);
  });

  it('should be reactive to user changes', () => {
    const initialPremium = component.premiumUsers();
    const newPremium = 3500;

    component.premiumUsers.set(newPremium);

    expect(component.premiumUsers()).toBe(newPremium);
    expect(component.premiumUsers()).not.toEqual(initialPremium);
  });

  it('should have correct chart data structure', () => {
    const chartOption = component.chartOption();
    const series = chartOption.series as unknown as {
      data: { value: number; name: string; itemStyle: { color: string } }[];
    }[];
    const data = series[0]?.data;

    expect(data).toBeDefined();
    expect(data?.length).toBe(2);
    expect(data?.[0]?.name).toBe('Premium Users');
    expect(data?.[1]?.name).toBe('Basic Users');
    expect(data?.[0]?.itemStyle.color).toBe('#696FFB');
    expect(data?.[1]?.itemStyle.color).toBe('#696FFB99');
  });
});
