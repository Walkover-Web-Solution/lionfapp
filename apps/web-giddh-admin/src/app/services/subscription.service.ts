import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { SUBSCRIPTION_API } from './apiurls/subscription.api';
import { ErrorHandler } from './catchManager/catchmanger';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { CommonPaginatedRequest } from '../modules/modules/api-modules/subscription';


@Injectable()
export class SubscriptionService {
    private companyUniqueName: string;

    constructor(private errorHandler: ErrorHandler,
        private http: HttpWrapperService,
        @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
    }

    /**
     * Create Account Service
     */
    public getAllSubscriptions(model: CommonPaginatedRequest) {
        return this.http.get(this.config.apiUrl + SUBSCRIPTION_API.GET_SUBSCRIPTION, model)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    /**
        * get all total for subscriptions
        */
    public getAllTotalSubscriptions() {
        return this.http.get(this.config.apiUrl + SUBSCRIPTION_API.GET_SUBSCRIPTION_TOTAL)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }
}
