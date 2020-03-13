import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { SUBSCRIPTION_API } from './apiurls/subscription.api';
import { ErrorHandler } from './catchManager/catchmanger';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { CommonPaginatedRequest, AdvanceSearchRequestSubscriptions, UpdateSubscriptionModel, GetAllCompaniesRequest } from '../modules/modules/api-modules/subscription';


@Injectable()
export class SubscriptionService {
    public getCompanyfilter: GetAllCompaniesRequest;
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

    public getAllSubscriptionsViaAdvancedSearch(model: AdvanceSearchRequestSubscriptions, filter: CommonPaginatedRequest) {
        return this.http.post(this.config.apiUrl + SUBSCRIPTION_API.GET_SUBSCRIPTION_BY_POST.replace(':count', filter.count).replace(':page', filter.page).replace(':sortBy', filter.sortBy).replace(':sortType', filter.sortType), model)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    //getAllCompaniesBySubscriptionId
    /**
     * API call to get all companies using subscriptionId and companyName
     *
     * @param {GetAllCompaniesRequest} body request body 
     * @param {CommonPaginatedRequest} model pagination filter 
     * @returns
     * @memberof SubscriptionService
     */
    public getAllCompanies(body: GetAllCompaniesRequest, model: CommonPaginatedRequest) {
        let url = SUBSCRIPTION_API.GET_ALL_COMPANIES
        if (model.sortBy) {
            url = url + '&sortBy=:sortBy';// &sortType=:sortType&
            url = url.replace(':sortBy', model.sortBy);
        }
        if (model.sortType) {
            url = url + '&sortType=:sortType';
            url = url.replace(':sortType', model.sortType);
        }
        if (model.page) {
            url = url.replace(':page', model.page);
        }
        return this.http.post(this.config.apiUrl + url, body)
            .pipe(
                map((resp) => {
                    return resp;
                }),
                catchError((e) =>
                    this.errorHandler.HandleCatch(e)));
    }

    public getAuditLog(model) {
        return this.http.get(this.config.apiUrl + SUBSCRIPTION_API.GET_AUDIT_LOGS, model)
            .pipe(
                map((resp) => {
                    return resp;
                }),
                catchError((e) =>
                    this.errorHandler.HandleCatch(e)));
    }

    public updateSubscription(subscriptionId: string, model: UpdateSubscriptionModel) {
        return this.http.patch(this.config.apiUrl + SUBSCRIPTION_API.UPDATE_SUBSCRIPTION.replace(':subscriptionId', subscriptionId), model)
            .pipe(
                map((resp) => {
                    return resp;
                }),
                catchError((e) =>
                    this.errorHandler.HandleCatch(e)));
    }

    public setGetAllCompanyRequestObject(model: GetAllCompaniesRequest) {
        this.getCompanyfilter = model;
    }

    public getGetAllCompanyRequestObject(): GetAllCompaniesRequest {
        return this.getCompanyfilter;
    }

    public updateTransactions(subscriptionId: string, body: any) {
        let url = SUBSCRIPTION_API.UPDATE_TRANSACTIONS
        url = url.replace(':subscriptionId', subscriptionId);

        return this.http.put(this.config.apiUrl + url, body)
            .pipe(
                map((resp) => {
                    return resp;
                }),
                catchError((e) =>
                    this.errorHandler.HandleCatch(e)));
    }

    public assignPlan(body: any) {
        let url = SUBSCRIPTION_API.ASSIGN_PLAN

        return this.http.post(this.config.apiUrl + url, body)
            .pipe(
                map((resp) => {
                    return resp;
                }),
                catchError((e) =>
                    this.errorHandler.HandleCatch(e)));
    }
}
