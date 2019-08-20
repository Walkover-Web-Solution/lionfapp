import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { SUBSCRIPTION_API } from './apiurls/subscription.api';
import { ErrorHandler } from './catchManager/catchmanger';
import {IServiceConfigArgs, ServiceConfig} from './service.config';


@Injectable()
export class LicenceService {
  private companyUniqueName: string;

  constructor(private errorHandler: ErrorHandler,
              private http: HttpWrapperService,
              @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
  }

    /**
     * Create Account Service
     */
    public getAllLicence() {
        return this.http.get(this.config.apiUrl + SUBSCRIPTION_API.GET_ALL_LICENCE)
            .pipe(
            map((res) => {
                return res;
            }),
            catchError((e) => this.errorHandler.HandleCatch(e)));
    }
}
