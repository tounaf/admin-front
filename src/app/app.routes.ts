import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Page1 } from './page1/page1';
import { Page2 } from './page2/page2';
import { FiangonanaManagement } from './fiangonana-management/fiangonana-management';
import { Offering } from './offering/offering';
import { FiangonanaListComponent } from './fiangonana-management/fiangonana-list-component/fiangonana-list-component';
import { FiangonanaFormComponent } from './fiangonana-management/fiangonana-form-component/fiangonana-form-component';

export const routes: Routes = [
     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'finance', component: Offering },
  // { path: 'fiangonana', component: FiangonanaManagement }
  { path: 'fiangonanas', component: FiangonanaListComponent },
  { path: 'fiangonanas/create', component: FiangonanaFormComponent },
  { path: 'fiangonanas/:id/edit', component: FiangonanaFormComponent },
];
