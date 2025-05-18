import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'manage-debt',
  imports: [CardModule, TableModule],
  templateUrl: './manage-debt.component.html',
  styleUrl: './manage-debt.component.scss'
})
export class ManageDebtComponent {

}
