import { createTestingModule } from '../../../../../../testing/test-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChart } from './radar-chart';

describe('RadarChart', () => {
  let component: RadarChart;
  let fixture: ComponentFixture<RadarChart>;

  beforeEach(async () => {
    await createTestingModule([RadarChart]).compileComponents();

    fixture = TestBed.createComponent(RadarChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
