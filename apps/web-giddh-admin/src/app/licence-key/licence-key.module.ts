import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { licenceKeyRoutingModule } from './licence-key-routing.module';
import { licenceKeyComponent } from './licence-key-component/licence-key.component';
import { GenerateKeyComponent } from './components/generate-key/generate-key.component';



@NgModule({
  declarations: [licenceKeyComponent, GenerateKeyComponent],
  imports: [
    CommonModule,
    licenceKeyRoutingModule,
    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class licenceKeyModule { }