import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { LoginComponent } from './login.component'
import { LoginRoutingModule } from './login-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class LoginModule { }