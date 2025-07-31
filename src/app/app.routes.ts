import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Offering } from './offering/offering';
import { FiangonanaListComponent } from './fiangonana-management/fiangonana-list-component/fiangonana-list-component';
import { FiangonanaFormComponent } from './fiangonana-management/fiangonana-form-component/fiangonana-form-component';
import { Expense } from './expense/expense';
export const routes: Routes = [
     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'finance', component: Offering },
  { path: 'fiangonanas', component: FiangonanaListComponent },
  { path: 'fiangonanas/create', component: FiangonanaFormComponent },
  { path: 'fiangonanas/:id/edit', component: FiangonanaFormComponent },
  { path: 'expenses', component: Expense },
];
