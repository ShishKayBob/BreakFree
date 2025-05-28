import { Component, Input } from '@angular/core';
import { MeterGroup } from 'primeng/metergroup';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import Debt from '../../../types/debt';
import { DebtService } from '../../../services/debt.service';

@Component({
  selector: 'progress-report',
  imports: [MeterGroup, CardModule, ButtonModule, CommonModule],
  templateUrl: './progress-report.component.html',
  styleUrl: './progress-report.component.scss'
})
export class ProgressReportComponent {

  @Input() public debts: Debt[] = [];

  public value: any[] = [];

  public totalDebt: number = 0;

  constructor(private debtService: DebtService) { }

  ngOnInit() {
    this.value = this.formatDebtsForProgress(this.debts);
    this.totalDebt = this.debtService.getTotalInitialDebt();
  }

  public formatDebtsForProgress(debts: Debt[]): { debt: Debt, color1: string; color2: string, value: number }[] {
    if (debts.length === 0) return [];

    const result: { debt: Debt, color1: string; color2: string, value: number }[] = [];

    let currentColor = this.generateBoldColor();

    for (let i = 0; i < debts.length; i++) {
      const nextColor = i === debts.length - 1 ? this.generateBoldColor() : this.generateBoldColor();

      result.push({
        debt: debts[i],
        color1: currentColor,
        color2: nextColor,
        value: parseFloat(((debts[i].currentBalance / this.debtService.getTotalCurrentDebt()) * 100).toFixed(2))
      });

      currentColor = nextColor; // Shift the gradient
    }

    return result;
  }

  public hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      Math.round(255 * (l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1))));

    return '#' + [f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  public generateBoldColor(): string {
    const hue = Math.floor(Math.random() * 360); // 0 to 359
    return this.hslToHex(hue, 100, 40); // 100% saturation, 40% lightness, this makes bold colors that are still accessible with #FFFFFF text
  }
}
