import { Component, OnInit, TemplateRef, ViewChild, Input, HostListener, ElementRef } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { GeneralService } from '../../../services/general.service';
import { GeneralActions } from '../../../actions/general/general.action';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, ReplaySubject, Subject, Observable, of as observableOf } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminActions } from '../../../actions/admin.actions';
import { CommonPaginatedRequest, SubscriberList, AuditLogsRequest, GetAllCompaniesRequest, PAGINATION_COUNT, StatusModel, CompanyAdvanceSearchRequestSubscriptions } from '../../../modules/modules/api-modules/subscription';
import { SubscriptionService } from '../../../services/subscription.service';
import { ToasterService } from '../../../services/toaster.service';
import { BsModalRef, BsModalService, BsDropdownDirective } from 'ngx-bootstrap';
import { IOption } from '../../../theme/ng-select/ng-select';
import { PlansService } from '../../../services/plan.service';
import * as moment from 'moment/moment';
import { GIDDH_DATE_FORMAT } from '../../../shared/defalutformatter/defaultDateFormat';
import { CompanyFieldFilterColumnNames } from '../../../models/company';
import { FavouriteColumnPageTypeEnum } from '../../../actions/general/general.const';
import { ColumnFilterService } from '../../../services/column-filter.service';
import { cloneDeep } from '../../../lodash-optimized';

@Component({
    selector: 'edit-subscription',
    templateUrl: './edit-subscriptions.component.html',
    styleUrls: ['./edit-subscriptions.component.scss']
})

export class EditSubscriptionsComponent implements OnInit {

    @ViewChild('companyName') companyName: ElementRef;
    @ViewChild('userName') userName: ElementRef;
    @ViewChild('subscriptionIdSearch') subscriptionIdSearch: ElementRef;


    @Input() public showTaxPopup: boolean = false;
    @Input() public showTaxPopups: boolean = false;

    public togglePanelBool: boolean;
    @ViewChild('filterDropDownList') public filterDropDownList: BsDropdownDirective;

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
    public showFieldFilter: CompanyFieldFilterColumnNames = new CompanyFieldFilterColumnNames();
    public isFieldColumnFilterApplied: boolean;
    public isAllFieldColumnFilterApplied: boolean;

    public planStatusType: StatusModel = {
        trial: false,
        active: false,
        expired: false
    }
    public selectedAllPlanType = ['trial', 'active', 'expired'];
    public searchViaCompanyName$ = new Subject<string>();
    public searchViaUserName$ = new Subject<string>();
    public searchViaSubscribedOn$ = new Subject<string>();
    public searchViaSubscriptionID$ = new Subject<string>();
    public showClearFilter: boolean = false;
    /** Page type enum */
    public pageTypeEnum: FavouriteColumnPageTypeEnum

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
    public isAllPlanSelected: boolean = false;
    public isAllPlanTypeSelected: boolean = false;
    public searchedAdvancedRequestModelByAdvanceSearch: CompanyAdvanceSearchRequestSubscriptions;
    /** Local storage to save filter */
    public localStorageKeysForFilters = { pageType: 'pageTypeName', filter: 'Columnfilter' };


    constructor(private store: Store<AppState>, private modalService: BsModalService, private generalActions: GeneralActions, private toasty: ToasterService, private adminActions: AdminActions, private subscriptionService: SubscriptionService, private router: Router, private generalService: GeneralService, private activateRoute: ActivatedRoute, private plansService: PlansService,
        private columnFilterService: ColumnFilterService) {
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
                this.showClearFilter = true;
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
            if (term) {
                this.showClearFilter = true;
            }
            this.getAllCompaniesRequest.companyName = term.trim();
            this.getAllCompanies();
        });

        this.searchViaUserName$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            if (term) {
                this.showClearFilter = true;
            }
            this.getAllCompaniesRequest.userName = term.trim();
            this.getAllCompanies();
        });
        this.searchViaSubscriptionID$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            if (term) {
                this.showClearFilter = true;
            }
            this.getAllCompaniesRequest.subscriptionId = term.trim();
            this.getAllCompanies();
        });
        this.getColumnFilter();
    }

    public getAllCompanies() {
        if (this.paginationRequest) {
            if (this.getAllCompaniesRequest && this.getAllCompaniesRequest.status && this.getAllCompaniesRequest.status.length) {
                this.showClearFilter = true;
            } else if (this.getAllCompaniesRequest && this.getAllCompaniesRequest.planUniqueNames && this.getAllCompaniesRequest.planUniqueNames.length) {
                this.showClearFilter = true;
            }
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
    public toggleTaxPopups(action: boolean) {
        this.showTaxPopups = action;
    }

    /**
     * Tax input focus handler
     *
     * @memberof TaxControlComponent
     */
    public handleInputFocus(isShow: boolean): void {
        this.showTaxPopup = isShow ? false : true;
    }

    public status(isShow: boolean): void {
        this.showTaxPopups = isShow ? false : true;
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

        setTimeout(() => {
            if (inlineSearch === "planName") {
                this.companyName.nativeElement.focus();
            }

            if (inlineSearch === "userName") {
                this.userName.nativeElement.focus();
            }

            if (inlineSearch === "subId") {
                this.subscriptionIdSearch.nativeElement.focus();
            }
        }, 20);
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
        this.getAllPlansRequest.sortBy = '';
        this.getAllPlansRequest.sortType = '';
        this.plansService.getAllPlans(this.getAllPlansRequest, this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.allPlans = [];
                res.body.results.forEach(key => {
                    this.allPlans.push({ label: key.name, value: key.uniqueName, additional: false });
                });
            } else {
                this.toasty.clearAllToaster();
                this.toasty.errorToast("Something went wrong in getting plans! Please try again.");
            }
        });
    }

    /**
     * Tp prepare array of selected status
     *
     * @param {string} type plan status type
     * @param {*} event Event
     * @memberof EditSubscriptionsComponent
     */
    public checkedPlanStatus(type: string, event) {
        if (event.target.checked) {
            if (this.selectedPlanStatus.indexOf(type) === -1) {
                this.selectedPlanStatus.push(type);
                this.showClearFilter = true;
            }
        } else {
            let index = this.selectedPlanStatus.indexOf(type);
            this.selectedPlanStatus.splice(index, 1)
        }
        this.isAllPlansSelected();
        this.getAllCompaniesRequest.status = this.selectedPlanStatus;
        this.getAllCompanies();
    }

    /**
     * To prepare array of selectd plans
     *
     * @param {*} item  plan name
     * @param {*} event Event
     * @memberof EditSubscriptionsComponent
     */
    public checkedPlanName(item, event) {
        if (event.target.checked) {
            if (this.selectedPlans.indexOf(item.value) === -1) {
                this.selectedPlans.push(item.value);
            }
        } else {
            let index = this.selectedPlans.indexOf(item.value);
            this.selectedPlans.splice(index, 1);
        }
        this.isAllPlansStatusSelected();
        this.getAllCompaniesRequest.planUniqueNames = this.selectedPlans;
        this.getAllCompanies();
    }

    /**
     *  API call to serach by plans subscribed date
     * 
     * @memberof EditSubscriptionsComponent
     */
    public searchViaSubscribedOn() {
        this.getAllCompaniesRequest.startedAtFrom = this.getAllCompaniesRequest.startedAtFrom ? moment(this.getAllCompaniesRequest.startedAtFrom).format(GIDDH_DATE_FORMAT) : '';
        this.showClearFilter = true;
        this.getAllCompanies();
    }

    /**
     * Reset company filter
     *
     * @memberof EditSubscriptionsComponent
     */
    public resetGellAllCompaniesFilters() {
        this.getAllCompaniesRequest.startedAtFrom = '';
        this.getAllCompaniesRequest.companyName = '';
        this.getAllCompaniesRequest.subscriptionId = '';
        this.getAllCompaniesRequest.planUniqueNames = [];
        this.getAllCompaniesRequest.userName = '';
        this.getAllCompaniesRequest.status = [];
        this.getAllCompaniesRequest.expiryFilter = {
            from: '',
            to: ''
        };
        this.getAllCompaniesRequest.subscribeOn = {
            from: '',
            to: ''
        };
        this.getAllCompaniesRequest.remainingTxnOpn = "";
        this.getAllCompaniesRequest.remainingTxn = "";
        this.getAllCompaniesRequest.transactionLimitOperation = "";
        this.getAllCompaniesRequest.transactionLimit = "";
        this.getAllCompaniesRequest.additionalChargesOperation = "";
        this.getAllCompaniesRequest.additionalCharges = "";
    }

    /**
     * Hard reset all data model
     *
     * @memberof EditSubscriptionsComponent
     */
    public resetFilters() {
        this.resetGellAllCompaniesFilters();
        this.paginationRequest.page = 1;
        this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = false;
        this.allPlans.forEach(res => {
            res.additional = false;
        });
        this.showClearFilter = false;
        this.isAllPlanStatusTypeSelected();
        this.isAllPlanSelected = false;
        this.isAllPlanTypeSelected = false;
        this.getAllCompanies();
        this.selectAllColumns(true);

    }

    /**
     *  To check if any plan selected
     *
     * @param {*} event Event for checkbox
     * @memberof EditSubscriptionsComponent
     */
    public selectAllPlans(event) {
        this.selectedPlans = [];
        if (event.target.checked) {
            this.allPlans.forEach(res => {
                this.selectedPlans.push(res.value);
            });
            this.allPlans.map(res => {
                res.additional = true;
            });
        } else {
            this.selectedPlans = [];
            this.allPlans.map(res => {
                res.additional = false;
            });
        }
        this.isAllPlansSelected();
        this.getAllCompaniesRequest.planUniqueNames = this.selectedPlans;
        this.getAllCompanies();
    }

    /**
     * To check All plans status check
     *
     * @param {*} event Event for All plan select checkbox
     * @memberof EditSubscriptionsComponent
     */
    public selectAllPlansStatus(event) {
        this.selectedPlanStatus = [];
        if (event.target.checked) {
            this.selectedPlanStatus = this.selectedAllPlanType;
            this.isAllPlansStatusSelected(true);
        } else {
            this.selectedPlanStatus = []
            this.isAllPlansStatusSelected(false);
        }
        this.getAllCompaniesRequest.status = this.selectedPlanStatus;
        this.getAllCompanies();
    }

    /**
     * To check all plan selected or not
     *
     * @private
     * @memberof EditSubscriptionsComponent
     */
    private isAllPlansSelected() {
        if (this.allPlans.length === this.selectedPlans.length) {
            this.isAllPlanSelected = true;
        } else {
            this.isAllPlanSelected = false;
        }
    }

    /**
     * To reset status type model
     * 
     * @private
     * @param {boolean} [isAllStatus] Boolean to check is all plan statu selected or not
     * @memberof EditSubscriptionsComponent
     */
    private isAllPlansStatusSelected(isAllStatus?: boolean) {
        if (isAllStatus) {
            this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = true;
        } else {
            this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = false;
        }
        this.isAllPlanStatusTypeSelected();
    }

    /**
     * To check all plan status selected or not
     *
     * @memberof EditSubscriptionsComponent
     */
    public isAllPlanStatusTypeSelected() {
        if (this.selectedPlanStatus.length === 3) {
            this.isAllPlanTypeSelected = true;
        } else {
            this.isAllPlanTypeSelected = false;
        }
    }

    public advanceSearchRequestEmitter(event) {
        if (event) {
            this.searchedAdvancedRequestModelByAdvanceSearch = event;
            this.getAllCompaniesRequest.subscribeOn = event.subscribeOn;
            this.getAllCompaniesRequest.remainingTxnOpn = event.remainingTxnOpn;
            this.getAllCompaniesRequest.remainingTxn = event.remainingTxn;
            this.getAllCompaniesRequest.transactionLimitOperation = event.transactionLimitOperation;
            this.getAllCompaniesRequest.transactionLimit = event.transactionLimit;
            this.getAllCompaniesRequest.additionalChargesOperation = event.additionalChargesOperation;
            this.getAllCompaniesRequest.additionalCharges = event.additionalCharges;
            this.getAllCompaniesRequest.expiryFilter = event.expiryFilter;
            this.togglePanel();
            this.getAllCompanies();

            if(event.subscribeOn || event.remainingTxnOpn || event.remainingTxn || event.transactionLimitOperation || event.transactionLimit || event.additionalChargesOperation || event.additionalCharges || event.expiryFilter) {
                this.showClearFilter = true;
            }
        }
    }

    public togglePanel() {
        if (this.togglePanelBool) {
            this.togglePanelBool = false;
        } else {
            this.togglePanelBool = true;
        }
        this.toggleBodyClass();
    }

    public toggleBodyClass() {
        if (this.togglePanelBool) {
            document.querySelector('body').classList.add('fixed');
        } else {
            document.querySelector('body').classList.remove('fixed');
        }
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.togglePanel();
    }
    
    /**
     * API call to get all filter column
     *
     * @memberof EditSubscriptionsComponent
     */
    public getColumnFilter(): void {
        this.columnFilterService.getFavouritePage('ADMIN_COMPANY').subscribe(response => {
            if (response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
                 this.getShowFieldFilterIsApplied();
            }
        });
         console.log('getShowFieldFilterIsApplied', this.getShowFieldFilterIsApplied());
    }

    /**
      * API call to update filter column
      *
      * @memberof EditSubscriptionsComponent
      */
    public updateColumnFilter(): void {
        this.getShowFieldFilterIsApplied();
        this.columnFilterService.updateFavouritePage('ADMIN_COMPANY', this.showFieldFilter).subscribe(response => {
            if (response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
            }
        });
    }

    // Column filter methods
    public hideListItems() {
        this.filterDropDownList.hide();
    }

    /**
     * This will toggle all columns
     *
     * @param {boolean} event
     * @memberof EditSubscriptionsComponent
     */
    public selectAllColumns(event: boolean): void {
        this.showFieldFilter.companyName = event;
        this.showFieldFilter.userName = event;
        this.showFieldFilter.subscribedOn = event;
        this.showFieldFilter.subscriptionId = event;
        this.showFieldFilter.planName = event;
        this.showFieldFilter.remainingTransaction = event;
        this.showFieldFilter.transactionLimit = event;
        this.showFieldFilter.totalAmount = event;
        this.showFieldFilter.additionalTransaction = event;
        this.showFieldFilter.additionalCharges = event;
        this.showFieldFilter.ratePerTransaction = event;
        this.showFieldFilter.status = event;
        this.showFieldFilter.expiry = event;
        if (event) {
            this.isAllFieldColumnFilterApplied = true;
        } else {
            this.isAllFieldColumnFilterApplied = false;

        }
        this.updateColumnFilter();
    }

    /**
     *To apply column toggle filter
     *
     * @param {boolean} event boolean is column show or hide
     * @param {string} column Column name
     * @memberof EditSubscriptionsComponent
     */
    public columnFilter(event: boolean, column: string) {
        this.showFieldFilter[column] = event;
        this.updateColumnFilter();
    }

    /**
     *To check is any column toggle filter applied
     *
     * @returns {boolean}
     * @memberof EditSubscriptionsComponent
     */
    public getShowFieldFilterIsApplied(): boolean {
        this.isFieldColumnFilterApplied = false;
        Object.keys(this.showFieldFilter).forEach(key => {
            if (!this.showFieldFilter[key]) {
                this.isFieldColumnFilterApplied = true;
                this.showClearFilter = true
            }
        });
        return this.isFieldColumnFilterApplied;
    }
}
