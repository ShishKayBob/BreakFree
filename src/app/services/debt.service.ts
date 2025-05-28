import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Debt from '../types/debt';
import Payment from '../types/payment';
import { LocalStorageService } from './local-storage.service';
import DebtInfo from '../types/debtInfo';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  public $debtService!: BehaviorSubject<DebtInfo>;

  private debts: Debt[] = [];

  private strategy: string = '';

  private repaymentOrder: number[] = [];

  constructor(public localStorageService: LocalStorageService) {
    this.localStorageService.$savedDebtData
      .subscribe((value: any) => {
        this.debts = value?.debts ? value.debts : [];
        this.strategy = value?.strategy ? value.strategy : '';
        this.repaymentOrder = value?.repaymentOrder ? [...value.repaymentOrder] : [];
        this.$debtService = new BehaviorSubject({ strategy: this.strategy, debts: this.debts, repaymentOrder: this.repaymentOrder });
      });
  }

  public addDebt(debt: Debt) {
    this.debts.push(debt);
    this.repaymentOrder.push(this.debts.length);
    this.pushSubject();
  }

  public editDebt(debtIndex: number, debt: Debt) {
    this.debts[debtIndex] = debt;
    this.pushSubject();
  }

  public removeDebt(debtIndex: number) {
    this.debts.splice(debtIndex, 1);
    const orderIndex = this.repaymentOrder.findIndex((value) => value === debtIndex+1);
    this.repaymentOrder.splice(orderIndex, 1);
    this.repaymentOrder.forEach((value, index, arr) => {
      if (value > debtIndex) {
        arr[index] = value - 1;
      }
    });
    console.log(this.repaymentOrder);
    this.pushSubject();
    console.log(this.repaymentOrder)
  }

  public makePayment(debtIndex: number, payment: Payment) {
    this.debts[debtIndex].paymentHistory.push(payment);
    this.pushSubject();
  }

  public saveDebtStrategy(strategy?: string, order?: number[]) {
    this.strategy = strategy ? strategy : this.strategy;
    this.repaymentOrder = order ? order : this.repaymentOrder;
    this.pushSubject();
  }

  public getTotalMimimums(): number {
    let minimums = 0;
    this.debts.forEach((debt) => minimums += debt.estMinPayment);
    return minimums;
  }

  public getTotalInitialDebt() {
    let total = 0;
    this.debts.forEach((debt) => total += debt.initialBalance);
    return total;
  }

  public getTotalCurrentDebt() {
    let total = 0;
    this.debts.forEach((debt) => total += debt.currentBalance);
    return total;
  }

  public pushSubject() {
    this.$debtService = new BehaviorSubject({ strategy: this.strategy, debts: this.debts, repaymentOrder: this.repaymentOrder });
    this.localStorageService.saveDebtData('breakfree-debts', { strategy: this.strategy, debts: this.debts, repaymentOrder: this.repaymentOrder });
  }
}
