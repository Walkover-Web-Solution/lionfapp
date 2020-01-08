import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { SUBSCRIPTION_API } from './apiurls/subscription.api';
import { ErrorHandler } from './catchManager/catchmanger';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { CommonPaginatedRequest } from '../modules/modules/api-modules/subscription';


@Injectable()
export class UserService {
    private companyUniqueName: string;

    constructor(private errorHandler: ErrorHandler,
        private http: HttpWrapperService,
        @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
    }

    /**
     * Create Account Service
     */
    public getAllSubscriptionsByUser(model: CommonPaginatedRequest, post: any) {
        let url = this.config.apiUrl + SUBSCRIPTION_API.GET_USER_SUBSCRIPTION;
        url = url.replace(":sortBy", model.sortBy);
        url = url.replace(":sortType", model.sortType);
        url = url.replace(":page", String(model.page));
        url = url.replace(":count", String(model.count));

        return this.http.post(url, post)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }
}
