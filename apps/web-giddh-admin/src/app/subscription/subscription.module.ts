import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription-component/subscription.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UserListComponent } from './components/user-list/user-list.component';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SubscriptionModalModule } from '../shared/subscription-modal/subscription-modal.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { EditPlanModalComponent } from '../shared/edit-plan/edit-plan.component';
import { DigitsOnlyModule } from '../shared/directive/digitonly/digitsOnly.module';
import { EditSubscriptionsComponent } from './components/edit-subscriptions/edit-subscriptions.component';
import { SubscriptionContainerComponent } from './components/suscription-container/subscription-container.component';

@NgModule({
  declarations: [SubscriptionComponent, SubscriptionContainerComponent, UserListComponent, AdvanceSearchComponent, EditPlanModalComponent, EditSubscriptionsComponent],
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