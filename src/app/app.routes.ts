import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/organism/landing-page/landing-page.component';
import { DashboardComponent } from './components/organism/dashboard/dashboard.component';
import { DebtCenterComponent } from './components/organism/debt-center/debt-center.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: '', component: DashboardComponent },
    { path: '', component: DebtCenterComponent }
];
