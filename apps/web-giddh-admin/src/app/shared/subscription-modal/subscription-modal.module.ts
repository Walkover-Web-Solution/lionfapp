import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionModalComponent } from './subscription-modal.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
    declarations: [SubscriptionModalComponent],
    imports: [
        CommonModule,
        PerfectScrollbarModule,
        TabsModule,
        PaginationModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ClickOutsideModule
    ],
    exports: [
        SubscriptionModalComponent
    ]
})
export class SubscriptionModalModule { }