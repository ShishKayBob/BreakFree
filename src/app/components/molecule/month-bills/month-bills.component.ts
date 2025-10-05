import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import Debt from '../../../types/debt';
import { DebtService } from '../../../services/debt.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import Payment from '../../../types/payment';

@Component({
  selector: 'month-bills',
  imports: [CardModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    Dialog,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    CheckboxModule],
  templateUrl: './month-bills.component.html',
  styleUrl: './month-bills.component.scss',
})
export class MonthBillsComponent {
  @Input()
  public debts: Debt[] = [];

  public debtIndex: number | null = null;

  public paymentForm!: FormGroup;

  public paymentDialog: boolean = false;

  private debtServiceSubscription!: Subscription;

  constructor(
    private debtService: DebtService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      payment: ['0.00', [Validators.required, Validators.min(0)]],
      isLate: [0, [Validators.required]],
      balance: ['0.00', [Validators.min(0)]],
    });
  }

  ngOnDestroy() {
    this.debtServiceSubscription?.unsubscribe();
  }

  public togglePaymentDialog(index: number | null) {
    this.paymentDialog = !this.paymentDialog;
    this.debtIndex = index;
  }

  public savePayment() {
    if (!this.paymentForm.valid || !this.debtIndex) return;
    const form = this.paymentForm.value;
    const payment = {
      amount: +form.payment,
      date: new Date().toISOString().slice(0, 10),
      late: !!form.isLate
    };
    this.debtService.makePayment(this.debtIndex, payment);
    if (form.balance && !isNaN(+form.balance)) {
      this.debts[this.debtIndex].currentBalance = +form.balance;
      this.debtService.editDebt(this.debtIndex, this.debts[this.debtIndex]);
    }
    this.paymentForm.reset();
    this.togglePaymentDialog(null);
  }

  getPaymentsForMonth(debt: Debt, month: string): Payment[] {
    return debt.paymentHistory.filter(p => p.date.startsWith(month));
  }

}
