import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription-component/subscription.component';

import { SuscriptionContainerComponent } from './components/suscription-container/suscription-container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UserListComponent } from './components/user-list/user-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';



@NgModule({
  declarations: [SubscriptionComponent, SuscriptionContainerComponent, UserListComponent, AdvanceSearchComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class SubscriptionModule { }