import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Debt from '../types/debt';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  public $debtService!: BehaviorSubject<any>;

  private debts: Debt[] = [];

  constructor() { }

  public addDebt() {

  }

  public removeDebt() {

  }

  public makePayment() {
    
  }

}
