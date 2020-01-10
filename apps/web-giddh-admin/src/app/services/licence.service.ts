import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { LICENSE_API } from './apiurls/licensekeys.api';
import { ErrorHandler } from './catchManager/catchmanger';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { CommonPaginatedRequest } from '../modules/modules/api-modules/subscription';


@Injectable()
export class LicenceService {
    private companyUniqueName: string;

    constructor(private errorHandler: ErrorHandler,
        private http: HttpWrapperService,
        @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
    }

    public getAllLicenseKeys(model: CommonPaginatedRequest) {
        return this.http.get(this.config.apiUrl + LICENSE_API.GET_ALL_LICENSE, model).pipe(
            map((res) => {
                return res;
            }),
            catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    public createLicenseKey(model: any) {
        return this.http.post(this.config.apiUrl + LICENSE_API.CREATE_LICENSE, model).pipe(
            map((res) => {
                return res;
            }),
            catchError((e) => this.errorHandler.HandleCatch<any, any>(e)));
    }

    public getLicenseKeyStatistics() {
        return this.http.get(this.config.apiUrl + LICENSE_API.STATISTICS_LICENSE).pipe(
            map((res) => {
                return res;
            }),
            catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    public deleteLicenseKeys(model: any) {
        return this.http.patch(this.config.apiUrl + LICENSE_API.DELETE_LICENSE, model).pipe(
            map((res) => {
                return res;
            }),
            catchError((e) => this.errorHandler.HandleCatch<any, any>(e)));
    }
}
