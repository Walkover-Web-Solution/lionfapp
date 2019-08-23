import { Routes } from '@angular/router';
import { NotFoundComponent } from './404/404-component';
import { AdminComponent } from './admin.component';
import { UserAuthenticated } from './decorators/UserAuthenticated';


export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionModule', canActivate: [UserAuthenticated] },
      { path: 'licence-key', loadChildren: './licence-key/licence-key.module#licenceKeyModule', canActivate: [UserAuthenticated] },
      { path: '404', component: NotFoundComponent }
    ]
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },

];
