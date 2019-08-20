import { Routes } from '@angular/router';
import { NotFoundComponent } from './404/404-component';


export const ROUTES: Routes = [
  { path: '', loadChildren: './subscription/subscription.module#SubscriptionModule' },
  {path: '404', component: NotFoundComponent},
  {path: '**', pathMatch: 'full', component: NotFoundComponent},
];
