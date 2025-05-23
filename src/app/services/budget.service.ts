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

  private budget: Budget = { income: [], expenses: [] };

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

  public editBudget(type: string, index: number, item: BudgetCategory) {
    if (type === 'income') {
      this.budget.income.splice(index, 1, item);
    } else {
      this.budget.expenses.splice(index, 1, item);
    }
    this.pushSubject();
  }

  public pushSubject() {
      this.$budgetService = new BehaviorSubject(this.budget);
      // this.localStorageService.saveData('breakfree-data', this.budget);
    }
}
