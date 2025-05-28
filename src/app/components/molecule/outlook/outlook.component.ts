import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProjectionService } from '../../../services/projection.service';
import Debt from '../../../types/debt';
import { getNextMonthNames } from '../../../utils/dateUtils';

interface ChartSeries {
  label: string;
  data: number[];
}

@Component({
  selector: 'outlook',
  imports: [ChartModule],
  templateUrl: './outlook.component.html',
  styleUrl: './outlook.component.scss'
})
export class OutlookComponent {

  @Input()
  public strategy: string = '';

  @Input()
  public repaymentOrder: number[] = [];

  @Input()
  public debts: Debt[] = [];

  @Input()
  public allocation: number = 0;

  data: any;

  options: any;

  constructor(private cd: ChangeDetectorRef, private projectService: ProjectionService) { }

  ngOnInit() {
    this.initChart();
  }

  public initChart() {
    const debtProjection = this.projectService.predictDebtPayoff(this.debts, this.allocation, this.strategy, this.repaymentOrder);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.data = {
      labels: getNextMonthNames(debtProjection.months),
      datasets: [ ...this.formatDebtHistoryForChart(debtProjection.debtHistory, debtProjection.months)],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColor
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
    this.cd.markForCheck();
  }

  public formatDebtHistoryForChart(debtHistory: any, totalMonths: number): ChartSeries[] {
    const resultMap: { [debtName: string]: number[] } = {};

    // Iterate month by month
    for (let i = 1; i <= totalMonths; i++) {
      const debts = debtHistory[i];
      for (const debt of debts) {
        if (!resultMap[debt.name]) {
          resultMap[debt.name] = new Array(i - 1).fill(0); // Fill previous months with 0s if first appearance is late
        }
        resultMap[debt.name].push(parseFloat(debt.currentBalance.toFixed(2)));
      }

      // Fill gaps for debts that didn’t appear this month
      for (const name in resultMap) {
        if (resultMap[name].length < i) {
          resultMap[name].push(0); // Or push the previous value to carry forward
        }
      }
    }

    // Format into the desired output structure
    return Object.entries(resultMap).map(([name, data]) => ({
      label: name,
      data,
    }));
  }
}
