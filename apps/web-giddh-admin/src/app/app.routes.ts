import { Routes } from '@angular/router';
import { NotFoundComponent } from './404/404-component';
import { AdminComponent } from './admin.component';
import { UserAuthenticated } from './decorators/UserAuthenticated';


export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionModule', canActivate: [UserAuthenticated] },
      { path: 'license-key', loadChildren: './licence-key/licence-key.module#LicenceKeyModule', canActivate: [UserAuthenticated] },
      { path: 'plans', loadChildren: './plans/plans.module#PlansModule', canActivate: [UserAuthenticated] },
      { path: '404', component: NotFoundComponent }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },

];