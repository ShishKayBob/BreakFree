import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import Budget from '../../../types/budget';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DebtService } from '../../../services/debt.service';
import DebtInfo from '../../../types/debtInfo';
import Debt from '../../../types/debt';

@Component({
  selector: 'budget-list',
  imports: [TableModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    InputGroupAddonModule,
    InputGroupModule,
    CardModule,
    DividerModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent {

  public budget: Budget = { income: [], expenses: [] };

  public debts: Debt[] = [];

  constructor(private debtService: DebtService) { }

  ngOnInit() {
    this.debtService.$debtService.subscribe((value: DebtInfo) => {
      this.debts = [...value.debts];
    })

  }

  public addRow(category: string) {
    if (category === 'expense') {
      this.budget.expenses.push({ name: 'New Expense', amount: 0 });
    } else {
      this.budget.income.push({ name: 'New Income', amount: 0 });
    }
  }

  public onEditComplete() {

  }

}
