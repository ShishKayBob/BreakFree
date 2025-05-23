import { Component } from '@angular/core';
import { ManageDebtComponent } from '../../molecule/manage-debt/manage-debt.component';
import { DebtStrategyComponent } from '../../molecule/debt-strategy/debt-strategy.component';
import { Subscription } from 'rxjs';
import { DebtService } from '../../../services/debt.service';
import DebtInfo from '../../../types/debtInfo';
import Debt from '../../../types/debt';
import { cloneArray } from '../../../utils/arrayUtils';

@Component({
  selector: 'app-debt-center',
  imports: [ManageDebtComponent, DebtStrategyComponent],
  templateUrl: './debt-center.component.html',
  styleUrl: './debt-center.component.scss'
})
export class DebtCenterComponent {

  public strategy: string = '';

  public repaymentOrder: number[] = [];

  public debts: Debt[] = [];

  private debtServiceSubscription!: Subscription;

  constructor(private debtService: DebtService) { }

  ngOnInit() {
    this.debtServiceSubscription = this.debtService.$debtService
          .subscribe((value: DebtInfo) => {
            this.strategy =  value.strategy;
            this.repaymentOrder = value.repaymentOrder;
            this.debts = value.debts;
          });
  }

  ngOnDestroy() {
    this.debtServiceSubscription.unsubscribe();
  }

}
