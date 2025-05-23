import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
import { BudgetService } from '../../../services/budget.service';
import BudgetCategory from '../../../types/budgetCategory';

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

  @Input()
  public income: BudgetCategory[] = [];

  @Input()
  public expenses: BudgetCategory[] = [];

  @Input()
  public debts: Debt[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit() { }

  public addRow(category: string) {
    this.budgetService.addBudget(category, { name: 'Name', amount: 0 });
  }

  public deleteRow(category: string, index: number) {
    this.budgetService.deleteBudget(category, index);
  }

  public onEditComplete(category: string, index: number, item: BudgetCategory) {
    this.budgetService.editBudget(category, index, item);
  }

}
