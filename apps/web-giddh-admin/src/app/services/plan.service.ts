import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { ErrorHandler } from './catchManager/catchmanger';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { PLANS_API } from './apiurls/plans.api';
import { CommonPaginatedRequest } from '../modules/modules/api-modules/subscription';

@Injectable()
export class PlansService {
    constructor(private errorHandler: ErrorHandler,
        private http: HttpWrapperService,
        @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
    }

    public getAllPlans(model: CommonPaginatedRequest, post: any) {
        let url = this.config.apiUrl + PLANS_API.GET_PLANS;
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

    public getCountry() {
        let url = this.config.apiUrl + PLANS_API.GET_COUNTRIES;
        return this.http.get(url).pipe(
            map((res) => {
                return res;
            }));
    }

    public createPlan(post: any) {
        let url = this.config.apiUrl + PLANS_API.CREATE_PLAN;

        return this.http.post(url, post)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    public getCurrency() {
        let url = this.config.apiUrl + PLANS_API.GET_CURRENCIES;
        return this.http.get(url).pipe(
            map((res) => {
                return res;
            }));
    }

    public getPlan(uniqueName) {
        let url = this.config.apiUrl + PLANS_API.GET_PLAN_DETAILS;
        url = url.replace(":uniqueName", uniqueName);

        return this.http.get(url).pipe(
            map((res) => {
                return res;
            }));
    }

    public updatePlan(uniqueName, model: any) {
        let url = this.config.apiUrl + PLANS_API.GET_PLAN_DETAILS;
        url = url.replace(":uniqueName", uniqueName);

        return this.http.put(url, model).pipe(
            map((res) => {
                return res;
            }), catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    public getPlansStates(request: any) {
        let url = this.config.apiUrl + PLANS_API.GET_PLAN_STATS;
        return this.http.post(url, request).pipe(
            map((res) => {
                return res;
            }));
    }
}
