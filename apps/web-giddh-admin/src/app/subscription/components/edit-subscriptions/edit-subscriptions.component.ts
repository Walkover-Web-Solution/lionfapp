import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { GeneralService } from '../../../services/general.service';
import { GeneralActions } from '../../../actions/general/general.action';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminActions } from '../../../actions/admin.actions';
import { CommonPaginatedRequest, SubscriberList, AuditLogsRequest, GetAllCompaniesRequest } from '../../../modules/modules/api-modules/subscription';
import { SubscriptionService } from '../../../services/subscription.service';
import { ToasterService } from '../../../services/toaster.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'edit-subscription',
  templateUrl: './edit-subscriptions.component.html',
  styleUrls: ['./edit-subscriptions.component.scss']
})

export class EditSubscriptionsComponent implements OnInit {
  
  public inlineSearch: any = '';
  public userName: any = '';
  public SubscribedOn: any = '';
  public SubscriptionsID : any = '';
  
  public subscriptionId: string;
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public paginationRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
  public companiesData = [];
  public plansData: any = {};
  public modalRefEdit: BsModalRef;
  public companiesAllRes: SubscriberList = new SubscriberList();
  public subscriptionsAuditLogs = [];
  public subscriptionsAuditLogsResponse: any;
  public getAllCompaniesRequest: GetAllCompaniesRequest = new GetAllCompaniesRequest();
  public isDetailsShow: boolean = false;
  public auditLogRequest: AuditLogsRequest = {
    entity: '',
    sort: '',
    from: '',
    to: '',
    page: '',
    count: '',
    entityIdentifier: '',
  };




  constructor(private store: Store<AppState>, private modalService: BsModalService, private generalActions: GeneralActions, private toasty: ToasterService, private adminActions: AdminActions, private subscriptionService: SubscriptionService, private router: Router, private generalService: GeneralService, private activateRoute: ActivatedRoute) {
    this.paginationRequest.from = '';
    this.paginationRequest.page = 1;
    this.paginationRequest.count = 20;

  }

  ngOnInit() {
    this.getAllCompaniesRequest = this.subscriptionService.getGetAllCompanyRequestObject();
    this.activateRoute.params.subscribe(params => {
      this.auditLogRequest.count = 50;
      this.auditLogRequest.page = 1;
      if (params['subscriptionId']) {
        this.subscriptionId = params['subscriptionId'];
        // this.getAllCompaniesRequest.subscriptionId = params['subscriptionId'];
        this.auditLogRequest.entity = 'SUBSCRIPTION';
        this.auditLogRequest.entityIdentifier = this.subscriptionId
        this.isDetailsShow = true;
      } else {
        this.auditLogRequest.entity = 'SUBSCRIPTION';
        this.auditLogRequest.entityIdentifier = this.getAllCompaniesRequest.subscriptionId;
        this.isDetailsShow = false;
      }
      this.generalService.setCurrentPageTitle("view subscription detail");
    });
    this.getAllCompanies();
    if (this.auditLogRequest.entityIdentifier) {
      this.getAuditLogs(this.auditLogRequest);
    }
  }

  public getAllCompanies() {
    if (this.getAllCompaniesRequest && this.paginationRequest) {
      this.subscriptionService.getAllCompanies(this.getAllCompaniesRequest, this.paginationRequest).subscribe(resp => {
        if (resp) {
          if (resp.status === 'success') {
            this.companiesData = [];
            this.companiesAllRes = resp.body;
            this.companiesData = resp.body.results;
            if (this.companiesData.length > 0) {
              this.plansData = this.companiesData[0];
            }
          } else {
            this.toasty.errorToast(resp.message)
          }
        }
      });;
    }
  }

  public pageChanged(event) {
    this.paginationRequest.page = event.page;
    this.getAllCompanies();
  }

  /**
     * This function is used to put focus on column search
     *
     */
  public focusOnColumnSearch(inlineSearch) {
      this.inlineSearch = inlineSearch;
  }

  public focusOnColumnSearch2(userName) {
    this.userName = userName;
  }

  public focusOnColumnSearch3(SubscribedOn) {
    this.SubscribedOn = SubscribedOn;
  }

  public focusOnColumnSearch4(SubscriptionsID) {
    this.SubscriptionsID = SubscriptionsID;
  }

  /**
   * API call to get audit log
   *
   * @param {*} auditLogRequestParams request model
   * @memberof EditSubscriptionsComponent
   */
  public getAuditLogs(auditLogRequestParams): void {
    this.subscriptionService.getAuditLog(auditLogRequestParams).subscribe(resp => {
      if (resp) {
        if (resp.status === 'success') {
          if (resp.body && resp.body.paginatedResult) {
            this.subscriptionsAuditLogsResponse = resp.body.paginatedResult;
            if (resp.body.paginatedResult.results) {
              this.subscriptionsAuditLogs = resp.body.paginatedResult.results
            }
          } else {
            this.subscriptionsAuditLogs = resp.body.results;
          }

        } else {
          this.toasty.errorToast(resp.message)
        }
      }
    });;
  }

  public openEditModal(editPlan: TemplateRef<any>) {
    this.modalRefEdit = this.modalService.show(
      editPlan,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
