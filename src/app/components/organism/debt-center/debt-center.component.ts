import { Component } from '@angular/core';
import { ManageDebtComponent } from '../../molecule/manage-debt/manage-debt.component';

@Component({
  selector: 'app-debt-center',
  imports: [ManageDebtComponent],
  templateUrl: './debt-center.component.html',
  styleUrl: './debt-center.component.scss'
})
export class DebtCenterComponent {

}
