import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { licenceKeyRoutingModule } from './licence-key-routing.module';
import { licenceKeyComponent } from './licence-key-component/licence-key.component';



@NgModule({
  declarations: [licenceKeyComponent],
  imports: [
    CommonModule,
    licenceKeyRoutingModule,
    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class licenceKeyModule { }