import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { ErrorHandler } from './catchManager/catchmanger';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { PLANS_API } from './apiurls/plans.api';
import { CommonPaginatedRequest } from '../modules/modules/api-modules/subscription';

@Injectable()
export class PlansService {
    private companyUniqueName: string;

    constructor(private errorHandler: ErrorHandler,
        private http: HttpWrapperService,
        @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
    }

    /**
     * Create Account Service
     */
    public getAllPlans(model: CommonPaginatedRequest) {
        return this.http.get(this.config.apiUrl + PLANS_API.GET_PLANS, model)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }
}
