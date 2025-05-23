import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/molecule/navigation/navigation.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.localStorageService.restoreDebtData('breakfree-debts');
    this.localStorageService.restoreBudgetData('breakfree-budget');
  }
}
