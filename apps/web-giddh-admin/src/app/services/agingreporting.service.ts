import { catchError, map } from 'rxjs/operators';
import { Inject, Injectable, OnInit, Optional } from '@angular/core';
import { HttpWrapperService } from './httpWrapper.service';
import { DueAmountReportQueryRequest, DueAmountReportRequest, DueAmountReportResponse, DueRangeRequest } from '../models/api-models/Contact';
import { empty, Observable } from 'rxjs';
import { IServiceConfigArgs, ServiceConfig } from './service.config';
import { DUEAMOUNTREPORT_API_V2, DUEDAYSRANGE_API_V2 } from './apiurls/aging-reporting';
import { GeneralService } from './general.service';
import { BaseResponse } from '../models/api-models/BaseResponse';
import { ErrorHandler } from './catchManager/catchmanger';

@Injectable()
export class AgingreportingService implements OnInit {
  private companyUniqueName: string;

  constructor(private errorHandler: ErrorHandler, private _http: HttpWrapperService) {
  }

  public ngOnInit() {
    //
  }

}
