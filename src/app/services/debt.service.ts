import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Debt from '../types/debt';
import Payment from '../types/payment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  public $debtService!: BehaviorSubject<Debt[]>;

  private debts: Debt[] = [];

  constructor(public localStorageService: LocalStorageService) { 
    this.$debtService = new BehaviorSubject(this.debts);
  }

  public save() {
    this.localStorageService.saveData('breakfree-data', { debts: this.debts });
  }

  public load() {
    this.debts = this.localStorageService.restoreData('breakfree-data').debts;
    this.$debtService.next(this.debts);
  }

  public addDebt(debt: Debt) {
    this.debts.push(debt);
    this.$debtService.next(this.debts);
    this.save();
  }

  public editDebt(debtIndex: number, debt: Debt) {
    this.debts[debtIndex] = debt;
    this.$debtService.next(this.debts);
    this.save();
  }

  public removeDebt(debtIndex: number) {
    this.debts.splice(debtIndex, 1);
    this.$debtService.next(this.debts);
    this.save();
  }

  public makePayment(debtIndex: number, payment: Payment) {
    this.debts[debtIndex].paymentHistory.push(payment);
    this.$debtService.next(this.debts);
    this.save();
  }
}
