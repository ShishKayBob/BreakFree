import { Injectable } from '@angular/core';
import Budget from '../types/budget';
import { BehaviorSubject } from 'rxjs';
import BudgetCategory from '../types/budgetCategory';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public $budgetService!: BehaviorSubject<Budget>;

  private budget: Budget = { income: [], expenses: [], debtAllocation: 0 };

   constructor(public localStorageService: LocalStorageService) {
      this.localStorageService.$savedBudgetData
        .subscribe((value: Budget) => {
          this.budget = value;
          this.$budgetService = new BehaviorSubject(this.budget);
        });
    }

  public addBudget(type: string, item: BudgetCategory) {
    if (type === 'income') {
      this.budget.income?.push(item);
    } else {
      this.budget.expenses?.push(item);
    }
    this.pushSubject();
    console.log(this.budget)
  }

  public deleteBudget(type: string, index: number) {
    if (type === 'income') {
      this.budget.income.splice(index, 1);
    } else {
      this.budget.expenses.splice(index, 1);
    }
    this.pushSubject();
  }

  public editBudget(type: string, event: any) {
    const { index, field, data} = event;
    if (type === 'income') {
      let removed: any = this.budget.income.splice(index, 1)[0];
      removed[field] = data;
      this.budget.income.splice(index, 0 , removed);
    } else {
      let removed: any = this.budget.expenses.splice(index, 1)[0];
      removed[field] = data;
      this.budget.expenses.splice(index, 0 , removed);
    }
    this.pushSubject();
  }

  public editAllocation(amount: number) {
    if (amount) {
      this.budget.debtAllocation = amount;
    }
    this.pushSubject();
  }

  public getTotalIncome() {
    let income = 0;
    this.budget.income.forEach((item) => income += item.amount);
    return income;
  }

  public getTotalExpenses() {
    let expenses = 0;
    this.budget.expenses.forEach((item) => expenses += item.amount);
    return expenses;
  }

  public pushSubject() {
      this.$budgetService = new BehaviorSubject(this.budget);
      this.localStorageService.saveBudgetData('breakfree-budget', this.budget);
    }
}
