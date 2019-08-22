import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
/*
 * Platform and Environment providers/pipes/pipes
 */
import { ROUTES } from './app.routes';
import { reducers } from './store';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ToastrModule } from 'ngx-toastr';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { LaddaModule } from 'angular2-ladda';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionModule } from './actions/action.module';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.interfaces';
import { Configuration } from 'apps/web-giddh-admin/src/app/app.constant';
import { NotFoundComponent } from './404/404-component';
import { IS_ELECTRON_WA } from './app.constant';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ServiceModule } from './services/service.module';
import { ServiceConfig } from './services/service.config';
import { HeaderComponent } from './header/header.component';
import { SidebarDirective } from './shared/directive/sidebar.directive';
import { LoaderComponent } from './loader/loader.component';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  {provide: APP_BASE_HREF, useValue: IS_ELECTRON_WA ? './' : AppUrl + APP_FOLDER}
  // { provide: APP_BASE_HREF, useValue: './' }
];

interface InternalStateType {
  [key: string]: any;
}


// tslint:disable-next-line:prefer-const
let CONDITIONAL_IMPORTS = [];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  // return localStorageSync({ keys: ['session', 'permission'], rehydrate: true, storage: IS_ELECTRON_WA ? sessionStorage : localStorage })(reducer);
  return localStorageSync({keys: ['session', 'permission'], rehydrate: true, storage: localStorage})(reducer);
  // return localStorageSync({ keys: ['session', 'permission'], rehydrate: true, storage: sessionStorage })(reducer);
}

let metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
if (!environment.production) {
  console.log('loading react devtools ' + ENV);
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

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    SidebarDirective,
    LoaderComponent
    // SignupComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LaddaModule.forRoot({
      style: 'slide-left',
      spinnerSize: 30
    }),
    ServiceModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    NgbTypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    DatepickerModule.forRoot(),
    ActionModule.forRoot(),
    ToastrModule.forRoot({preventDuplicates: true, maxOpened: 3}),
    StoreModule.forRoot(reducers, {metaReducers}),
    PerfectScrollbarModule,
    RouterModule.forRoot(ROUTES, {useHash: IS_ELECTRON_WA}),
    StoreRouterConnectingModule,
    ...CONDITIONAL_IMPORTS,
    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    // ...environment.showDevModule ? [DevModuleModule] : [],
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   * enableTracing: true,
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: ServiceConfig,
      useValue: {apiUrl: Configuration.ApiUrl, appUrl: Configuration.AppUrl, _}
    }
  ]
})
export class AppModule {
}
