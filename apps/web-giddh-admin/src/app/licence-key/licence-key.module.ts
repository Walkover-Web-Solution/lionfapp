import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { LicenceKeyRoutingModule } from './licence-key-routing.module';
import { LicenceKeyComponent } from './licence-key-component/licence-key.component';
import { GenerateKeyComponent } from './components/generate-key/generate-key.component';

@NgModule({
    declarations: [LicenceKeyComponent, GenerateKeyComponent],
    imports: [
        CommonModule,
        LicenceKeyRoutingModule,
        PerfectScrollbarModule,
        BsDatepickerModule.forRoot(),
        PaginationModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class LicenceKeyModule { }