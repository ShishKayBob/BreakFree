import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtStrategyComponent } from './debt-strategy.component';

describe('DebtStrategyComponent', () => {
  let component: DebtStrategyComponent;
  let fixture: ComponentFixture<DebtStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
