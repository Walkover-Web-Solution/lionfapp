import { catchError, map } from 'rxjs/operators';
import { HttpWrapperService } from './httpWrapper.service';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { ErrorHandler } from './catchManager/catchmanger';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { COLUMN_FILTER } from './apiurls/column-filter.api';
import { Observable } from 'rxjs';


@Injectable()
export class ColumnFilterService {

    constructor(private errorHandler: ErrorHandler,
        private http: HttpWrapperService,
        @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
    }

    /**
     * API call to get favorite page column 
     * 
     * @param {string} pageName Module/Page name 
     */
    public getFavouritePage(pageName: string): Observable<any> {
        let url = this.config.apiUrl + COLUMN_FILTER.FAVORITE_PAGE_COLUMN;
        if (pageName) {
            url = url.replace(":pageName", pageName);
        }
        return this.http.get(url)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }

    /**
     * API call to update favorite column of an module which is selected by user
     *
     * @param {string} pageName Module/Page name 
     * @param {*} post Request body
     * @returns
     * @memberof UserService
     */
    public updateFavouritePage(pageName: string, post: any):  Observable<any> {
        let url = this.config.apiUrl + COLUMN_FILTER.FAVORITE_PAGE_COLUMN;
        if (pageName) {
            url = url.replace(":pageName", pageName);
        }

        return this.http.post(url, post)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((e) => this.errorHandler.HandleCatch(e)));
    }
}
