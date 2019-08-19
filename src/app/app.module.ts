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
import {ActionModule} from './actions/action.module';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { APP_BASE_HREF } from '@angular/common';
import { IS_ELECTRON_WA } from './app.constant';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoaderComponent } from './loader/loader.component';
import * as _ from './lodash-optimized';
import { ToastrModule } from 'ngx-toastr';

interface InternalStateType {
  [key: string]: any;
}

interface StoreType {
  state: InternalStateType;
  rootState: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

// tslint:disable-next-line:prefer-const
let CONDITIONAL_IMPORTS = [];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  // tslint:disable-next-line:max-line-length
  // return localStorageSync({ keys: ['session', 'permission'], rehydrate: true, storage: IS_ELECTRON_WA ? sessionStorage : localStorage })(reducer);
  return localStorageSync({keys: ['session', 'permission'], rehydrate: true, storage: localStorage})(reducer);
  // return localStorageSync({ keys: ['session', 'permission'], rehydrate: true, storage: sessionStorage })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
if (!environment.production) {
  // console.log('loading react devtools ' + ENV);
  // metaReducers.push(storeFreeze);
  CONDITIONAL_IMPORTS.push(StoreDevtoolsModule.instrument({maxAge: 50}));
  console.log(CONDITIONAL_IMPORTS);
} else {
  console.log('loading react devtools production');
  console.log(CONDITIONAL_IMPORTS);
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarDirective,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule.forRoot(), BsDropdownModule.forRoot(), BsDatepickerModule.forRoot(),
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    ServiceModule.forRoot(),
    ActionModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    ToastrModule.forRoot({preventDuplicates: true, maxOpened: 3})
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
