import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtCenterComponent } from './debt-center.component';

describe('DebtCenterComponent', () => {
  let component: DebtCenterComponent;
  let fixture: ComponentFixture<DebtCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
