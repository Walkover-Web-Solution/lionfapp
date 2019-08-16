import { ErrorHandler } from './catchManager/catchmanger';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SubscriptionService } from './subscription.service';
import {HttpWrapperService} from './httpWrapper.service';
import {ToasterService} from './toaster.service';
import {LoaderService} from '../loader/loader.service';
import {GeneralService} from './general.service';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule
  ],
  exports: [CommonModule, FormsModule, RouterModule]
})
export class ServiceModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        ErrorHandler,
        HttpWrapperService,
        SubscriptionService,
        ToasterService,
        LoaderService,
        GeneralService
      ]
    };
  }
}
