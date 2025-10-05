import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should report missing debt data when nothing is set', () => {
    component.strategy = '';
    component.debts = [];
    component.repaymentOrder = [];
    expect(component.missingDebtData()).toContain('Select a debt payoff strategy');
    expect(component.missingDebtData()).toContain('Add at least one debt');
    expect(component.missingDebtData()).toContain('Set a repayment order');
  });

  it('should not report missing data when all requirements are met', () => {
    component.strategy = 'Avalanche';
    component.debts = [{
      name: 'Test Debt',
      type: 'loan',
      initialBalance: 1000,
      currentBalance: 1000,
      interestRate: 5,
      estMinPayment: 50,
      paymentHistory: []
    }];
    component.repaymentOrder = [0];
    expect(component.missingDebtData()).toEqual([]);
  });

  it('should report only the missing items', () => {
    component.strategy = '';
    component.debts = [{
      name: 'Test Debt',
      type: 'loan',
      initialBalance: 1000,
      currentBalance: 1000,
      interestRate: 5,
      estMinPayment: 50,
      paymentHistory: []
    }];
    component.repaymentOrder = [];
    const missing = component.missingDebtData();
    expect(missing).toContain('Select a debt payoff strategy');
    expect(missing).not.toContain('Add at least one debt');
    expect(missing).toContain('Set a repayment order');
  });
});
