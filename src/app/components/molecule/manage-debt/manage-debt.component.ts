import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import DebtInfo from '../../../types/debtInfo';
import { cloneArray } from '../../../utils/arrayUtils';

@Component({
  selector: 'manage-debt',
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
    FloatLabelModule],
  templateUrl: './manage-debt.component.html',
  styleUrl: './manage-debt.component.scss',
})
export class ManageDebtComponent {
  public debts: Debt[] = [];

  public newDebtForm!: FormGroup;

  public addDebtDialog: boolean = false;

  public debtTypes: any[] = [
    { name: 'Credit Card', code: 'credit' },
    { name: 'Loan', code: 'loan' },
    { name: 'Installment', code: 'installment' },
  ];

  private debtServiceSubscription!: Subscription;

  constructor(
    private debtService: DebtService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {    
    this.debtServiceSubscription = this.debtService.$debtService
      .subscribe((value: DebtInfo) => {
        this.debts = value.debts;
      });

    this.newDebtForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['credit', Validators.required],
      initialBalance: ['', [Validators.required, Validators.min(0)]],
      interestRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      estMinPayment: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnDestroy() {
    this.debtServiceSubscription?.unsubscribe();
  }

  public toggleAddDebtDialog() {
    this.addDebtDialog = !this.addDebtDialog;
  }

  public addDebt() {
    const debt: Debt = { ...this.newDebtForm.value, currentBalance: this.newDebtForm.value.initialBalance, paymentHistory: [] };
    this.debtService.addDebt(debt);
    this.newDebtForm.reset();
    this.toggleAddDebtDialog();
  }

  public deleteDebt(index: number) {
    this.debtService.removeDebt(index);
  }

}
