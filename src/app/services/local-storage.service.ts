import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public $savedDebtData!: BehaviorSubject<any>;

  public $savedBudgetData!: BehaviorSubject<any>;

  private breakfreeDebtData: any;

  private breakfreeBudgetData: any;

  public saveDebtData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.breakfreeDebtData = data;
    this.$savedDebtData = new BehaviorSubject(this.breakfreeDebtData);
  }

  public restoreDebtData(key: string) {
    const localData = JSON.parse(localStorage.getItem(key) || 'null');
    this.breakfreeDebtData = localData ? localData : { debts: [] };
    this.$savedDebtData = new BehaviorSubject(this.breakfreeDebtData);
  }

  public saveBudgetData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.breakfreeBudgetData = data;
    this.$savedBudgetData = new BehaviorSubject(this.breakfreeBudgetData);
  }

  public restoreBudgetData(key: string) {
    const localData = JSON.parse(localStorage.getItem(key) || 'null');
    this.breakfreeBudgetData = localData ? localData : { income: [], expenses: [] };
    this.$savedBudgetData = new BehaviorSubject(this.breakfreeBudgetData);
  }
}