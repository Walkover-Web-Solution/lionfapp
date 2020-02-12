import { catchError, map } from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';
import { Configuration, URLS } from '../app.constants';
import { Router } from '@angular/router';
import { HttpWrapperService } from './httpWrapper.service';
import { LoaderService } from './loader.service';
import { GMAIL_API, LOGIN_API, ONBOARDING_COUNTRIES } from './apiurls/login.api';
import { BaseResponse } from '../models/api-models/BaseResponse';
import { AuthKeyResponse, LinkedInRequestModel, SignupWithMobile, UserDetails, VerifyEmailModel, VerifyEmailResponseModel, VerifyMobileModel, VerifyMobileResponseModel, CountryRequest } from '../models/api-models/loginModels';
import { ErrorHandler } from './catchManager/catchmanger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { LoginWithPassword, SignUpWithPassword } from '../models/api-models/login';
import { LICENSE_API } from './apiurls/licensekeys.api';

@Injectable()
export class AuthenticationService {

  constructor(private errorHandler: ErrorHandler,
              public _httpClient: HttpClient,
              public _http: HttpWrapperService,
              public _router: Router,
              @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {

  }


  public LoginWithGoogle(token: string) {
    let args: any = {headers: {}};
    args.headers['cache-control'] = 'no-cache';
    args.headers['Content-Type'] = 'application/json';
    args.headers['Accept'] = 'application/json';
    args.headers['Access-Token'] = token;
    args.headers = new HttpHeaders(args.headers);
    return this._httpClient.get(this.config.apiUrl + LOGIN_API.LOGIN_WITH_GOOGLE, {
      headers: args.headers,
      responseType: 'json'
    }).pipe(map((res) => {
      let data: BaseResponse<VerifyEmailResponseModel, string> = res as BaseResponse<VerifyEmailResponseModel, string>;
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<VerifyEmailResponseModel, string>(e, args)));
  }

  public getCountry(): Observable<BaseResponse<any, any>> {
        const url = this.config.apiUrl + ONBOARDING_COUNTRIES.COUNTRIES_API;
        return this._http.get(url).pipe(
            map((res) => {
                let data: BaseResponse<any, any> = res;
                return data;
            }));
    }

    public getAllPlanUsingCountry(countryCode: any): Observable<BaseResponse<any, any>> {
        let url = this.config.apiUrl + LICENSE_API.GET_PLANS_USING_COUNTRY;
        url = url.replace(':country', countryCode);
        return this._http.get(url).pipe(
            map((res) => {
                let data: BaseResponse<any, any> = res;
                return data;
            }));
    }
}
