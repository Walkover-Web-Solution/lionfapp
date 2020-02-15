import { Component, OnInit, TemplateRef, ViewChild, Input } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { GeneralService } from '../../../services/general.service';
import { GeneralActions } from '../../../actions/general/general.action';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminActions } from '../../../actions/admin.actions';
import { CommonPaginatedRequest, SubscriberList, AuditLogsRequest, GetAllCompaniesRequest, PAGINATION_COUNT } from '../../../modules/modules/api-modules/subscription';
import { SubscriptionService } from '../../../services/subscription.service';
import { ToasterService } from '../../../services/toaster.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { IOption } from '../../../theme/ng-select/ng-select';
import { PlansService } from '../../../services/plan.service';
import * as moment from 'moment/moment';
import { GIDDH_DATE_FORMAT } from '../../../shared/defalutformatter/defaultDateFormat';

@Component({
    selector: 'edit-subscription',
    templateUrl: './edit-subscriptions.component.html',
    styleUrls: ['./edit-subscriptions.component.scss']
})

export class EditSubscriptionsComponent implements OnInit {

  @Input() public showTaxPopup: boolean = false;
  @Input() public maskInput: string;


    public inlineSearch: any = null;
    public selectedPlanStatus: string[] = [];
    public selectedPlans: string[] = [];
    public subscriptionId: string;
    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    public paginationRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public companiesData = [];
    public plansData: any = {};
    public modalRefEdit: BsModalRef;
    public companiesAllRes: SubscriberList = new SubscriberList();
    public subscriptionsAuditLogs = [];
    public subscriptionsAuditLogsResponse: any;
    public getAllCompaniesRequest: GetAllCompaniesRequest = {
        startedAtFrom: '',
        companyName: '',
        subscriptionId: '',
        planUniqueNames: [],
        userName: '',
        status: []
    };
    public searchViaCompanyName$ = new Subject<string>();
    public searchViaUserName$ = new Subject<string>();
    public searchViaSubscribedOn$ = new Subject<string>();
    public searchViaSubscriptionID$ = new Subject<string>();


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
    public getAllPlansRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public allPlans: IOption[] = [];
    public getAllPlansPostRequest: any = {};



    constructor(private store: Store<AppState>, private modalService: BsModalService, private generalActions: GeneralActions, private toasty: ToasterService, private adminActions: AdminActions, private subscriptionService: SubscriptionService, private router: Router, private generalService: GeneralService, private activateRoute: ActivatedRoute, private plansService: PlansService) {
        this.paginationRequest.from = '';
        this.paginationRequest.page = 1;
        this.paginationRequest.count = PAGINATION_COUNT;

    }

    ngOnInit() {
        if (this.subscriptionService.getGetAllCompanyRequestObject()) {
            this.getAllCompaniesRequest = this.subscriptionService.getGetAllCompanyRequestObject();
        }
        this.getAllPlans();
        this.activateRoute.params.subscribe(params => {
            this.auditLogRequest.count = PAGINATION_COUNT;
            this.auditLogRequest.page = 1;
            if (params['subscriptionId']) {
                this.subscriptionId = params['subscriptionId'];
                this.getAllCompaniesRequest.subscriptionId = params['subscriptionId'];
                this.auditLogRequest.entity = 'SUBSCRIPTION';
                this.auditLogRequest.entityIdentifier = this.subscriptionId;
                this.isDetailsShow = true;
                this.generalService.setCurrentPageTitle("view subscription detail");
            } else {
                this.auditLogRequest.entity = 'SUBSCRIPTION';
                if (this.getAllCompaniesRequest && this.getAllCompaniesRequest.subscriptionId) {
                    this.auditLogRequest.entityIdentifier = this.getAllCompaniesRequest.subscriptionId;
                }

                this.isDetailsShow = false;
                this.generalService.setCurrentPageTitle("Companies");
            }

        });
        this.getAllCompanies();
        if (this.auditLogRequest.entityIdentifier) {
            this.getAuditLogs(this.auditLogRequest);
        }

        this.searchViaCompanyName$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            this.getAllCompaniesRequest.companyName = term;
            this.getAllCompanies();
        });

        this.searchViaUserName$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            this.getAllCompaniesRequest.userName = term;
            this.getAllCompanies();
        });
        this.searchViaSubscriptionID$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            this.getAllCompaniesRequest.subscriptionId = term;
            this.getAllCompanies();
        });
    }

    public getAllCompanies() {
        if (this.paginationRequest) {
            this.subscriptionService.getAllCompanies(this.getAllCompaniesRequest, this.paginationRequest).subscribe(resp => {
                if (resp) {
                    if (resp.status === 'success') {
                        this.companiesData = [];
                        this.companiesAllRes = resp.body;
                        this.companiesData = resp.body.results;
                        if (this.companiesData.length > 0) {
                            this.plansData = this.companiesData[0];
                        } else {
                            this.inlineSearch = null;
                        }
                    } else {
                        this.toasty.errorToast(resp.message)
                    }
                }
            });;
        }
    }


    public toggleTaxPopup(action: boolean) {
      this.showTaxPopup = action;
    }


    public onFocusLastDiv(el) {
      let focussableElements = '.entrypanel input[type=text]:not([disabled]),.entrypanel [tabindex]:not([disabled]):not([tabindex="-1"])';
      // if (document.activeElement && document.activeElement.form) {
      let focussable = Array.prototype.filter.call(document.querySelectorAll(focussableElements),
          (element) => {
              // check for visibility while always include the current activeElement
              return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
          });
      let index = focussable.indexOf(document.activeElement);
      if (index > -1) {
          let nextElement = focussable[index + 1] || focussable[0];
          nextElement.focus();
      }
      this.toggleTaxPopup(false);
      return false;
    }

    /**
     * Tax input focus handler
     *
     * @memberof TaxControlComponent
     */
    public handleInputFocus(): void {
      this.showTaxPopup = true;
  }


    /**
     * Paginaton page change action
     *
     * @param {*} event page number
     * @memberof EditSubscriptionsComponent
     */
    public pageChanged(event) {
        this.paginationRequest.page = event.page;
        this.getAllCompanies();
    }

    /**
     *to sort table 
     *
     * @param {*} column  search params
     * @memberof SubscriptionContainerComponent
     */
    public sortBy(column) {
        if (column === this.paginationRequest.sortBy) {
            this.paginationRequest.sortType = (this.paginationRequest.sortType === "asc") ? "desc" : "asc";
        } else {
            this.paginationRequest.sortType = "asc";
        }

        this.paginationRequest.sortBy = column;
        this.getAllCompanies();
    }
    /**
       * This function is used to put focus on column search
       *
       */
    public focusOnColumnSearch(inlineSearch) {
        this.inlineSearch = inlineSearch;
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

                }
            }
        });;
    }

    /**
     * Hide header search box 
     *
     * @memberof EditSubscriptionsComponent
     */
    public hideOpenedSearchBox() {
        if (this.inlineSearch) {
            this.inlineSearch = null;
        }
    }

    /**
     *
     * Open edit plan model
     * @param {TemplateRef<any>} editPlan
     * @memberof EditSubscriptionsComponent
     */
    public openEditModal(editPlan: TemplateRef<any>) {
        this.modalRefEdit = this.modalService.show(
            editPlan,
            Object.assign({}, { class: 'gray modal-lg' })
        );
    }

    /**
     * This function is used to get all plans to show in dropdown
     *
     * @memberof EditSubscriptionsComponent
     */
    public getAllPlans(): void {
        this.getAllPlansRequest.count = PAGINATION_COUNT;
        this.getAllPlansRequest.page = 1;
        this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
        this.getAllPlansRequest.sortType = 'desc';
        this.plansService.getAllPlans(this.getAllPlansRequest, this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.allPlans = [];
                res.body.results.forEach(key => {
                    this.allPlans.push({ label: key.name, value: key.uniqueName });
                });
            } else {
                this.toasty.clearAllToaster();
                this.toasty.errorToast("Something went wrong in getting plans! Please try again.");
            }
        });
    }

    public checkedPlanStatus(type: string, event) {
        if (event.target.checked) {
            if (this.selectedPlanStatus.indexOf(type) === -1) {
                this.selectedPlanStatus.push(type);
            }
        } else {
            let index = this.selectedPlanStatus.indexOf(type);
            this.selectedPlanStatus.splice(index, 1)
        }
        this.getAllCompaniesRequest.status = this.selectedPlanStatus;
        this.getAllCompanies();
    }

    public checkedPlanName(item, event) {
        if (event.target.checked) {
            if (this.selectedPlans.indexOf(item.value) === -1) {
                this.selectedPlans.push(item.value);
            }
        } else {
            let index = this.selectedPlans.indexOf(item.value);
            this.selectedPlans.splice(index, 1);
        }
        this.getAllCompaniesRequest.planUniqueNames = this.selectedPlans;
        this.getAllCompanies();
    }

    public searchViaSubscribedOn() {
        this.getAllCompaniesRequest.startedAtFrom = this.getAllCompaniesRequest.startedAtFrom ? moment(this.getAllCompaniesRequest.startedAtFrom).format(GIDDH_DATE_FORMAT) : '';
        this.getAllCompanies();
    }
}
