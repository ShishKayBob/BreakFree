import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtAllocationComponent } from './debt-allocation.component';

describe('DebtAllocationComponent', () => {
  let component: DebtAllocationComponent;
  let fixture: ComponentFixture<DebtAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtAllocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
