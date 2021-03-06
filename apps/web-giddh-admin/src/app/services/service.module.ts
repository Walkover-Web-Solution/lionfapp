import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorHandler } from './catchManager/catchmanger';
import { HttpWrapperService } from './httpWrapper.service';
import { ToasterService } from './toaster.service';
import { LoaderService } from '../loader/loader.service';
import { LicenceService } from './licence.service';
import { UserService } from './user.service';
import { SubscriptionService } from './subscription.service';
import { PlansService } from './plan.service';
import { GeneralService } from './general.service'
import { AuthenticationService } from './authentication.service';
import { ColumnFilterService } from './column-filter.service';

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
                ToasterService,
                LoaderService,
                LicenceService,
                UserService,
                SubscriptionService,
                PlansService,
                AuthenticationService,
                GeneralService,
                ColumnFilterService
            ]
        };
    }
}
