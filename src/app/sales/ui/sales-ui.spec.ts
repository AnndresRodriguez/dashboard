import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUi } from './sales-ui';

describe('SalesUi', () => {
  let component: SalesUi;
  let fixture: ComponentFixture<SalesUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesUi],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
