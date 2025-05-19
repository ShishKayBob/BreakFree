import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import Debt from '../../../types/debt';
import { DebtService } from '../../../services/debt.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'manage-debt',
  imports: [CardModule, TableModule, ButtonModule],
  templateUrl: './manage-debt.component.html',
  styleUrl: './manage-debt.component.scss'
})
export class ManageDebtComponent {
  public debts: Debt[] = [];

  private debtServiceSubscription!: Subscription;

  constructor (private debtService: DebtService) { }

  ngOnInit() {
    this.debtServiceSubscription = this.debtService.$debtService
      .subscribe((value: Debt[]) => {
        this.debts = value;
      });
  }

  ngOnDestroy() {
    this.debtServiceSubscription?.unsubscribe();
  }

  public addDebt() {
    const debt: Debt = {
      name: 'amex',
      type: 'credit',
      initialBalance: 15000,
      currentBalance: 5000,
      interestRate: 0.25,
      estMinPayment: 450,
      paymentHistory: [],
    };
    this.debtService.addDebt(debt);
  }

}
