import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import Debt from '../types/debt';
import Payment from '../types/payment';
import { LocalStorageService } from './local-storage.service';
import Strategy from '../types/strategy';
import DebtInfo from '../types/debtInfo';
import { cloneArray } from '../utils/arrayUtils';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  public $debtService!: BehaviorSubject<DebtInfo>;

  private debts: Debt[] = [];

  private strategy: Strategy = { selectedStrategy: '', repaymentOrder: []};

  constructor(public localStorageService: LocalStorageService) {
    this.localStorageService.$savedData
      .subscribe((value: any) => {
        this.debts = value?.debts ? value.debts : [];
        this.strategy = value?.strategy ? value.strategy : { selectedStrategy: '', repaymentOrder: []};
        this.$debtService = new BehaviorSubject({ strategy: this.strategy, debts: this.debts});
      });
  }

  public addDebt(debt: Debt) {
    this.debts.push(debt);
    this.pushSubject();
  }

  public editDebt(debtIndex: number, debt: Debt) {
    this.debts[debtIndex] = debt;
    this.pushSubject();
  }

  public removeDebt(debtIndex: number) {
    this.debts.splice(debtIndex, 1);
    this.pushSubject();
  }

  public makePayment(debtIndex: number, payment: Payment) {
    this.debts[debtIndex].paymentHistory.push(payment);
    this.pushSubject();
  }

  public saveDebtStrategy(strategy: Strategy) {
    this.strategy = strategy;
    this.pushSubject();
  }

  public pushSubject() {
    console.log(this.debts);
    this.$debtService = new BehaviorSubject({ strategy: this.strategy, debts: cloneArray(this.debts)});
    this.localStorageService.saveData('breakfree-data', { debts: this.debts, strategy: this.strategy });
  }
}
