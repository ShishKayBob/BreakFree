import { Component } from '@angular/core';
import { OutlookComponent } from '../../molecule/outlook/outlook.component';
import Debt from '../../../types/debt';
import { Subscription } from 'rxjs';
import { DebtService } from '../../../services/debt.service';
import DebtInfo from '../../../types/debtInfo';
import { BudgetService } from '../../../services/budget.service';
import Budget from '../../../types/budget';
import { ProgressReportComponent } from '../../molecule/progress-report/progress-report.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [OutlookComponent, ProgressReportComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public strategy: string = '';
  
    public repaymentOrder: number[] = [];
  
    public debts: Debt[] = [];

    public totalAllocation: number = 0;
  
    private debtServiceSubscription!: Subscription;
  
    constructor(private debtService: DebtService, private budgetService: BudgetService) { }
  
    ngOnInit() {
      this.debtServiceSubscription = this.debtService.$debtService
            .subscribe((value: DebtInfo) => {
              this.strategy =  value.strategy;
              this.repaymentOrder = value.repaymentOrder;
              this.debts = value.debts;
            });

             this.budgetService.$budgetService
            .subscribe((value: Budget) => {
              this.totalAllocation = +value.debtAllocation + +this.debtService.getTotalMimimums();
            });
    }
  
    ngOnDestroy() {
      this.debtServiceSubscription.unsubscribe();
    }

    public missingDebtData(): string[] {
      const missing: string[] = [];
      if (!this.strategy) missing.push('Select a debt payoff strategy');
      if (!this.debts || this.debts.length === 0) missing.push('Add at least one debt');
      if (!this.repaymentOrder || this.repaymentOrder.length === 0) missing.push('Set a repayment order');
      return missing;
    }

}
