import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans-component/plans.component';
import { CreatePlansComponent } from './components/create-plans/create-plans.component';

@NgModule({
  declarations: [PlansComponent, CreatePlansComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
    PaginationModule
  ]
})
export class PlansModule { }