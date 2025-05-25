import { Component } from '@angular/core';
import { BudgetListComponent } from '../../molecule/budget-list/budget-list.component';
import { DebtService } from '../../../services/debt.service';
import { BudgetService } from '../../../services/budget.service';
import DebtInfo from '../../../types/debtInfo';
import Debt from '../../../types/debt';
import Budget from '../../../types/budget';
import BudgetCategory from '../../../types/budgetCategory';
import { cloneArray } from '../../../utils/arrayUtils';
import { DebtAllocationComponent } from '../../molecule/debt-allocation/debt-allocation.component';

@Component({
  selector: 'budget-builder',
  imports: [BudgetListComponent, DebtAllocationComponent],
  templateUrl: './budget-builder.component.html',
  styleUrl: './budget-builder.component.scss'
})
export class BudgetBuilderComponent {

  public income: BudgetCategory[] = [];

  public expenses: BudgetCategory[] = [];

  public debts: Debt[] = [];

  constructor(private debtService: DebtService, private budgetService: BudgetService) { }

  ngOnInit() {
    this.debtService.$debtService.subscribe((value: DebtInfo) => {
      this.debts = value.debts;
    });

    this.budgetService.$budgetService.subscribe((value: Budget) => {
      this.income = value.income;
      this.expenses = value.expenses;
    });
  }

}
