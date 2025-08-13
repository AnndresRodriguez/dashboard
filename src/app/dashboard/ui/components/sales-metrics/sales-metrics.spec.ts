import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesMetrics } from './sales-metrics';
import { createTestingModule } from '../../../../../testing/test-utils';

describe('SalesMetrics', () => {
  let component: SalesMetrics;
  let fixture: ComponentFixture<SalesMetrics>;

  beforeEach(async () => {
    await createTestingModule([SalesMetrics])
      .compileComponents();

    fixture = TestBed.createComponent(SalesMetrics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
