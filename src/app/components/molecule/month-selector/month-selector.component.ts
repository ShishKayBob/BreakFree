import { Component, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'month-selector',
  imports: [ButtonModule],
  templateUrl: './month-selector.component.html',
  styleUrl: './month-selector.component.scss'
})
export class MonthSelectorComponent {
  public selectedMonth: string = this.getCurrentMonth();

  public monthChange: EventEmitter<string> = new EventEmitter<string>();

  getCurrentMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  prevMonth() {
    const [year, month] = this.selectedMonth.split('-').map(Number);
    const date = new Date(year, month - 2, 1);
    this.selectedMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    this.monthChange.emit(this.selectedMonth);
  }

  nextMonth() {
    const [year, month] = this.selectedMonth.split('-').map(Number);
    const date = new Date(year, month, 1);
    this.selectedMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    this.monthChange.emit(this.selectedMonth);
  }

}
