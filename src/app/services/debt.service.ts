import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import Debt from '../types/debt';
import Payment from '../types/payment';
import { LocalStorageService } from './local-storage.service';
import DebtInfo from '../types/debtInfo';
import { cloneArray } from '../utils/arrayUtils';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  public $debtService!: BehaviorSubject<DebtInfo>;

  private debts: Debt[] = [];

  private strategy: string = '';

  private repaymentOrder: number[] = [];

  constructor(public localStorageService: LocalStorageService) {
    this.localStorageService.$savedData
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

  public pushSubject() {
    this.$debtService = new BehaviorSubject({ strategy: this.strategy, debts: this.debts, repaymentOrder: this.repaymentOrder });
    this.localStorageService.saveData('breakfree-debts', { strategy: this.strategy, debts: this.debts, repaymentOrder: this.repaymentOrder });
  }
}
