import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: './subscription/subscription.module#SubscriptionModule' },
  { path: '', loadChildren: './licence-key/licence-key.module#licenceKeyModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }