import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMetrics } from './sales-metrics';

describe('SalesMetrics', () => {
  let component: SalesMetrics;
  let fixture: ComponentFixture<SalesMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesMetrics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesMetrics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
