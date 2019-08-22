import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription-component/subscription.component'
import { UserListComponent } from './components/user-list/user-list.component'

const routes: Routes = [
  { path: '', component: SubscriptionComponent, pathMatch: 'full' },
  { path: 'users', component: UserListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
