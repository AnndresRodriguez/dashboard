import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntegration } from './list-integration';

describe('ListIntegration', () => {
  let component: ListIntegration;
  let fixture: ComponentFixture<ListIntegration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIntegration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIntegration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
