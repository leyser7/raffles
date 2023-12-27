import { Route } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';

export const routes: Route[] = [
  {
    path: 'tickets',
    component: TicketsComponent
  },
  {
    path: '**',
    redirectTo: 'tickets',
    pathMatch: 'full'
  }
];
