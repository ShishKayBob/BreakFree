import { Component } from '@angular/core';
import { OutlookComponent } from '../../molecule/outlook/outlook.component';
import Debt from '../../../types/debt';
import { Subscription } from 'rxjs';
import { DebtService } from '../../../services/debt.service';
import DebtInfo from '../../../types/debtInfo';
import { BudgetService } from '../../../services/budget.service';
import Budget from '../../../types/budget';

@Component({
  selector: 'app-dashboard',
  imports: [OutlookComponent],
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

}
