import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import Budget from '../../../types/budget';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'budget-list',
  imports: [TableModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    InputGroupAddonModule,
    InputGroupModule,
    CardModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent {

  public budget: Budget = { takeHome: 0, categories: [] };

  constructor() { }

  ngOnInit() {

  }

  public addRow() {
    this.budget.categories.push({ name: 'New Category', amount: 0 });
  }

  public onEditComplete() {

  }

}
