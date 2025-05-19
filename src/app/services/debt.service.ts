import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Debt from '../types/debt';
import Payment from '../types/payment';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  public $debtService!: BehaviorSubject<Debt[]>;

  private debts: Debt[] = [];

  constructor() { 
    this.$debtService = new BehaviorSubject(this.debts);
  }

  public addDebt(debt: Debt) {
    this.debts.push(debt);
    this.$debtService.next(this.debts);
    console.log(debt);

  }

  public editDebt(debtIndex: number, debt: Debt) {
    this.debts[debtIndex] = debt;
    this.$debtService.next(this.debts);
  }

  public removeDebt(debtIndex: number) {
    this.debts.splice(debtIndex, 1);
    this.$debtService.next(this.debts);
  }

  public makePayment(debtIndex: number, payment: Payment) {
    this.debts[debtIndex].paymentHistory.push(payment);
    this.$debtService.next(this.debts);
  }

}
