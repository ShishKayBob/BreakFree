import { Component } from '@angular/core';
import { ManageDebtComponent } from '../../molecule/manage-debt/manage-debt.component';
import { DebtStrategyComponent } from '../../molecule/debt-strategy/debt-strategy.component';

@Component({
  selector: 'app-debt-center',
  imports: [ManageDebtComponent, DebtStrategyComponent],
  templateUrl: './debt-center.component.html',
  styleUrl: './debt-center.component.scss'
})
export class DebtCenterComponent {

}
