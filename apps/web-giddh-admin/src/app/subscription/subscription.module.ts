import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription-component/subscription.component';

import { SuscriptionContainerComponent } from './components/suscription-container/suscription-container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UserListComponent } from './components/user-list/user-list.component';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { SuscriptionModalComponent } from './components/suscription-modal/suscription-modal.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SubscriptionModalModule } from '../shared/subscription-modal/subscription-modal.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { EditPlanModalComponent } from '../shared/edit-plan/edit-plan.component';
import { DigitsOnlyModule } from '../shared/helper/directives/digitsOnly/digitsOnly.module';

@NgModule({
  declarations: [SubscriptionComponent, SuscriptionContainerComponent, UserListComponent, AdvanceSearchComponent, SuscriptionModalComponent, EditPlanModalComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    PerfectScrollbarModule,
    TabsModule,
    PaginationModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    SubscriptionModalModule,
    DigitsOnlyModule
  ]
})
export class SubscriptionModule { }