import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { licenceKeyComponent } from './licence-key-component/licence-key.component';
import { GenerateKeyComponent } from './components/generate-key/generate-key.component';

const routes: Routes = [
  //{ path: 'subscription', component: SubscriptionComponent, pathMatch: 'full' },
  { path: '', component: licenceKeyComponent, pathMatch: 'full' },
  { path: 'generate', component: GenerateKeyComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class licenceKeyRoutingModule { }