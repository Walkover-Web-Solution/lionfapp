import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans-component/plans.component';
import { CreatePlansComponent } from './components/create-plans/create-plans.component';
import { MatSelectModule } from '@angular/material/select';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
    declarations: [PlansComponent, CreatePlansComponent],
    imports: [
        CommonModule,
        PlansRoutingModule,
        PerfectScrollbarModule,
        BsDatepickerModule.forRoot(),
        PaginationModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        ClickOutsideModule
    ]
})
export class PlansModule { }