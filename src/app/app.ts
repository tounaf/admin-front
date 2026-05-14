import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { LoadingService } from './http-client/loading.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'admin';
  protected currentRouteTitle = 'Tableau de bord';
  protected loading$ = inject(LoadingService).loading$;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ).subscribe(url => {
      this.updateTitle(url);
    });
  }

  private updateTitle(url: string) {
    if (url.includes('dashboard')) this.currentRouteTitle = 'Tableau de bord';
    else if (url.includes('fiangonanas')) this.currentRouteTitle = 'Gestion des Fiangonanas';
    else if (url.includes('finance')) this.currentRouteTitle = 'Gestion des Offrandes';
    else if (url.includes('expenses')) this.currentRouteTitle = 'Gestion des Dépenses';
    else if (url.includes('validations')) this.currentRouteTitle = 'Validations Sabbat';
    else this.currentRouteTitle = 'Admin';
  }

  logout() {
    // Logique de déconnexion (ex. : supprimer le token, rediriger vers login)
    console.log('Déconnexion');
  }
}
