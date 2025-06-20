import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Page1 } from './page1/page1';
import { Page2 } from './page2/page2';
import { FiangonanaManagement } from './fiangonana-management/fiangonana-management';

export const routes: Routes = [
     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'page1', component: Page1 },
  { path: 'page2', component: Page2 },
  { path: 'fiangonana', component: FiangonanaManagement }
];
