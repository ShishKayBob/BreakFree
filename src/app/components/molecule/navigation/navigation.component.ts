import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'navigation',
  imports: [MenubarModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  public items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Debt Center',
      icon: 'pi pi-wallet',
      routerLink: '/debt-center'
    },
    {
      label: 'Budget Builder',
      icon: 'pi pi-money-bill',
      routerLink: '/budget-builder'
    },
    {
      label: 'Monthly View',
      icon: 'pi pi-chart-pie',
      routerLink: '/overview'
    }
  ]
}
