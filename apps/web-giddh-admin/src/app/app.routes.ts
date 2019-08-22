import { Routes } from '@angular/router';
import { NotFoundComponent } from './404/404-component';
import { AdminComponent } from './admin.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionModule' },
      { path: 'licence-key', loadChildren: './licence-key/licence-key.module#licenceKeyModule' },
      { path: '404', component: NotFoundComponent }
    ]
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },

];
