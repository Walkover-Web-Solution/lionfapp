import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarDirective } from './sidebar.directive';
import { AlertModule, BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceModule } from './services/service.module';
import { ServiceConfig } from './services/service.config';
import { Configuration } from './app.constant';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule.forRoot(), BsDropdownModule.forRoot(), BsDatepickerModule.forRoot(),
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    ServiceModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: ServiceConfig,
      useValue: {apiUrl: Configuration.ApiUrl, appUrl: Configuration.AppUrl, _}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
