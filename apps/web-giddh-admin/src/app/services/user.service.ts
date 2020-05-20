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

    /**
    * Get all user data
    */
    public getAllUserCounts(request: any) {
        let url = this.config.apiUrl + SUBSCRIPTION_API.GET_ALL_USER_COUNTS;
        return this.http.post(url, request)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    /**
     * This will get the list of all admin users
     *
     * @returns
     * @memberof UserService
     */
    public getAllAdminUsers() {
        let url = this.config.apiUrl + SUBSCRIPTION_API.GET_ALL_ADMIN_USERS;
        return this.http.get(url)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    /**
     * This will assign the lead owner/manager to the selected user
     *
     * @param {string} userUniqueName
     * @param {*} post
     * @returns
     * @memberof UserService
     */
    public assignLeadOwner(userUniqueName: string, post: any) {
        let url = this.config.apiUrl + SUBSCRIPTION_API.ASSIGN_MANAGER;
        url = url.replace(":userUniqueName", userUniqueName);

        return this.http.put(url, post)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }
}
