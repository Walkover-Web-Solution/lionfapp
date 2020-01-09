import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans-component/plans.component';
import { CreatePlansComponent } from './components/create-plans/create-plans.component';
import { PlanDetailsComponent } from './components/plan-details/plan-details.component';
import { ShSelectModule } from '../theme/ng-virtual-select/sh-select.module';
import { MatSelectModule } from '@angular/material/select';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
    declarations: [PlansComponent, CreatePlansComponent, PlanDetailsComponent],
    imports: [
        CommonModule,
        PlansRoutingModule,
        PerfectScrollbarModule,
        BsDatepickerModule.forRoot(),
        PaginationModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        ClickOutsideModule,
        ShSelectModule
    ]
})
export class PlansModule { }