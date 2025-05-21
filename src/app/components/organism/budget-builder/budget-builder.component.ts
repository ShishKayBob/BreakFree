import { Component } from '@angular/core';
import { BudgetListComponent } from '../../molecule/budget-list/budget-list.component';

@Component({
  selector: 'budget-builder',
  imports: [BudgetListComponent],
  templateUrl: './budget-builder.component.html',
  styleUrl: './budget-builder.component.scss'
})
export class BudgetBuilderComponent {

}
