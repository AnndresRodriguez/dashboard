import { createTestingModule } from '../../../../../../testing/test-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChart } from './line-chart';

describe('LineChart', () => {
  let component: LineChart;
  let fixture: ComponentFixture<LineChart>;

  beforeEach(async () => {
    await createTestingModule([LineChart]).compileComponents();

    fixture = TestBed.createComponent(LineChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
