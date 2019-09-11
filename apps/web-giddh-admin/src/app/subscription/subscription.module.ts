import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription-component/subscription.component';

import { SuscriptionContainerComponent } from './components/suscription-container/suscription-container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UserListComponent } from './components/user-list/user-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { SuscriptionModalComponent } from './components/suscription-modal/suscription-modal.component';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [SubscriptionComponent, SuscriptionContainerComponent, UserListComponent, AdvanceSearchComponent, SuscriptionModalComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    PerfectScrollbarModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class SubscriptionModule { }