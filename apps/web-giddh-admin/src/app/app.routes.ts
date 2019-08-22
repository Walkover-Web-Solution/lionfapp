import { Routes } from '@angular/router';
import { NotFoundComponent } from './404/404-component';


export const ROUTES: Routes = [
  {path: '', redirectTo: 'subscription', pathMatch: 'full'},
  { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionModule' },
  { path: 'licence-key', loadChildren: './licence-key/licence-key.module#licenceKeyModule' },
  { path: 'plans', loadChildren: './plans/plans.module#PlansModule' },
  {path: '404', component: NotFoundComponent},
  {path: '**', pathMatch: 'full', component: NotFoundComponent},
];