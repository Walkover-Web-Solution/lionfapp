import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubscriptionService } from '../../../services/subscription.service';
import { AppState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { takeUntil, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, ReplaySubject, of as observableOf, Subject } from 'rxjs';
import { CommonPaginatedRequest, SubscriberList, TotalSubscribers, AdvanceSearchRequestSubscriptions, GetAllCompaniesRequest, PAGINATION_COUNT, StatusModel } from '../../../modules/modules/api-modules/subscription';
import { ToasterService } from '../../../services/toaster.service';
import * as moment from 'moment/moment';
import { GIDDH_DATE_FORMAT } from '../../../shared/defalutformatter/defaultDateFormat';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { IOption } from '../../../theme/ng-select/ng-select';
import { PlansService } from '../../../services/plan.service';


@Component({
    selector: 'app-suscription-container',
    templateUrl: './subscription-container.component.html',
    styleUrls: ['./subscription-container.component.scss']
})
export class SubscriptionContainerComponent implements OnInit {

    @ViewChild('SubscribersSignupField') public SubscribersSignupField;
    @ViewChild('subscribOnField') public subscribOnField;
    @ViewChild('subscribIdField') public subscribIdField;
    @Input() public showTaxPopup: boolean = false;
    @Input() public showTaxPopups: boolean = false;

    public modalRef: BsModalRef;
    public modalRefEdit: BsModalRef;
    public subscriptionId: any = '';
    public searchViaSubscriptionId$ = new Subject<string>();
    public searchViaSubscriptionId: string;
    public isFromAdvanceSearchRes: boolean = false;
    public togglePlanDetailsPanelBool: boolean;
    public getAllCompaniesRequest: GetAllCompaniesRequest = new GetAllCompaniesRequest();
    public getAllPlansRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public allPlans: IOption[] = [];
    public getAllPlansPostRequest: any = {};
    public selectedPlanStatusType: string[] = [];
    public selectedPlans: string[] = [];

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    public subscriberRes: SubscriberList = new SubscriberList();
    public subscriptionData = [];
    public rightToggle: boolean = false;
    public subscriptionRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public inlineSearch: any = '';
    public togglePanelBool: boolean;
    public totalSubscriber: TotalSubscribers;
    public searchedAdvancedRequestModelByAdvanceSearch: AdvanceSearchRequestSubscriptions;
    public advanceSearchRequest: AdvanceSearchRequestSubscriptions = {
        signUpOnFrom: '',
        subscriptionId: '',
        startedAtFrom: '',
    };

    public openUpdateTransactionPopup: boolean = false;
    public editSubscriptionIdTransaction: string = '';
    public openAssignPlanPopup: boolean = false;

    // public isAllPlansSelected$: Observable<boolean> = observableOf(false);
    // public isAllPlanTypeSelected$: Observable<boolean> = observableOf(false);
    public isAllPlanTypeSelected: boolean = false;
    public isAllPlanSelected: boolean = false;

    public planStatusType: StatusModel = {
        trial: false,
        active: false,
        expired: false
    }
    public selectedAllPlanType = ['trial', 'active', 'expired'];

    constructor(private store: Store<AppState>, private adminActions: AdminActions, private toasty: ToasterService,
        private subscriptionService: SubscriptionService, private modalService: BsModalService, private router: Router, private generalService: GeneralService, private plansService: PlansService) {

    }

    /**
     *To navigate edit subscription 
     *
     * @param {*} subscriptionId
     * @memberof SubscriptionContainerComponent
     */
    public openEditSubscription(subscriptionId) {
        this.subscriptionId = subscriptionId;
        this.getAllCompaniesRequest.subscriptionId = subscriptionId;
        this.subscriptionService.setGetAllCompanyRequestObject(this.getAllCompaniesRequest);
        this.router.navigate([`admin/subscription/edit/${subscriptionId}`]);
    }

    ngOnInit() {
        this.generalService.setCurrentPageTitle("Subscriptions");
        this.setDefaultrequest();
        this.getSubscriptionData(this.subscriptionRequest);
        this.getAllSubscriptionTotalData();
        this.setAllSubscriberList();
        this.store.pipe(select(s => s.subscriptions.isGetSubscriptionInprocess), takeUntil(this.destroyed$)).subscribe(res => {
            if (res) {
                this.hidePopup();
            }
        });
        this.searchViaSubscriptionId$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            this.advanceSearchRequest.subscriptionId = term;
            this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
        });
        this.getAllPlans();
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

    public onFocusLastDiv(el) {
        this.toggleTaxPopup(false);
        return false;
    }

    /**
     * To reset Advance search request component
     *
     * @memberof SubscriptionContainerComponent
     */
    public resetAdvanceSearch() {
        this.advanceSearchRequest.signUpOnFrom = '';
        this.advanceSearchRequest.startedAtFrom = '';
        this.advanceSearchRequest.subscriptionId = '';
        this.advanceSearchRequest.signUpOnTo = '';
        this.advanceSearchRequest.balance = '';
        this.advanceSearchRequest.expiry = '';
        this.advanceSearchRequest.startedAtBefore = '';
        this.advanceSearchRequest.startedAtTo = '';
        this.advanceSearchRequest.status = [];
        this.advanceSearchRequest.planName = '';
        this.advanceSearchRequest.userName = '';
        this.advanceSearchRequest.email = '';
        this.advanceSearchRequest.mobile = '';
        this.advanceSearchRequest.planUniqueNames = [];

    }

    /**
     * dispatched advance search to get subscriptions
     *
     * @param {*} advanceSearchRequest
     * @memberof SubscriptionContainerComponent
     */
    public getAdvancedSearchedSubscriptions(advanceSearchRequest) {
        this.store.dispatch(this.adminActions.getSubscriptionAdvancedSearch(advanceSearchRequest, this.subscriptionRequest));
    }

    public setDefaultrequest() {
        this.subscriptionRequest.count = PAGINATION_COUNT;
        this.subscriptionRequest.page = 1;
        this.subscriptionRequest.sortBy = '';
        this.subscriptionRequest.sortType = '';
    }

    /**
     * set subscriptions data
     *
     * @memberof SubscriptionContainerComponent
     */
    public setAllSubscriberList() {
        this.store.pipe(select(s => s.subscriptions.allSubscriptions), takeUntil(this.destroyed$)).subscribe(res => {
            if (res) {
                this.isFromAdvanceSearchRes = res.fromAdvanceSearch;
                if (res.status === 'success') {
                    if (res.body && res.body.results) {
                        this.subscriberRes = res.body;
                        this.subscriptionData = [];
                        res.body.results.forEach(key => {
                            if (key && key.userDetails && key.userDetails.signUpOn) {
                                key.userDetails.signUpOn = key.userDetails.signUpOn.split(" ")[0].replace(/-/g, "/");
                            }
                            if (key.startedAt) {
                                key.startedAt = key.startedAt.replace(/-/g, "/");
                            }
                            this.subscriptionData.push(key);
                        });
                    }
                } else {
                    this.toasty.errorToast(res.message)
                }
            }
        });
    }

    public focusOnColumnSearch(inlineSearch) {
        this.inlineSearch = inlineSearch;

        setTimeout(() => {
            if (this.inlineSearch === 'SubscribersSignup') {
                this.SubscribersSignupField.nativeElement.focus();
            }
        }, 200);
    }

    public searchViaAdvanceSearch() {
        this.advanceSearchRequest.signUpOnFrom = this.advanceSearchRequest.signUpOnFrom ? moment(this.advanceSearchRequest.signUpOnFrom).format(GIDDH_DATE_FORMAT) : '';
        this.advanceSearchRequest.startedAtFrom = this.advanceSearchRequest.startedAtFrom ? moment(this.advanceSearchRequest.startedAtFrom).format(GIDDH_DATE_FORMAT) : '';
        this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);

    }

    /**
     *Pagination 
     *
     * @param {*} event page no
     * @memberof SubscriptionContainerComponent
     */
    public pageChanged(event: any): void {
        this.subscriptionRequest.page = event.page;
        if (this.isFromAdvanceSearchRes) {
            this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
        } else {
            this.getSubscriptionData(this.subscriptionRequest);
        }
    }

    public getSubscriptionData(subscrieRequest) {
        this.store.dispatch(this.adminActions.getSubscription(subscrieRequest));
    }

    public getAllSubscriptionTotalData() {
        this.subscriptionService.getAllTotalSubscriptions().subscribe(res => {
            if (res.status === 'success') {
                this.totalSubscriber = res.body;
            } else {
                //  this.toasty.errorToast(res.message)
            }
        });
    }

    public advanceSearchRequestEmitter(event) {
        if (event) {
            this.searchedAdvancedRequestModelByAdvanceSearch = event;
            this.advanceSearchRequest = event;
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

    public hidePopup() {
        this.togglePanelBool = false;
        this.toggleBodyClass();
    }

    /**
     *Hard reset all applied filters
     *
     * @memberof SubscriptionContainerComponent
     */
    public resetFilters() {
        this.setDefaultrequest();
        this.resetAdvanceSearch();
        this.getSubscriptionData(this.subscriptionRequest);
        this.selectedPlans = [];
        this.subscriptionRequest.page = 1;
        this.selectedPlanStatusType = []
        this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = false;
        this.selectedAllPlanType = [];
        this.isAllPlansTypeChecked(false);
        this.allPlans.forEach(res => {
            res.additional = false;
        });
        this.isAllPlansStatusSelected();
        this.isAllPlansSelected();
    }

    /**
     *to sort table 
     *
     * @param {*} column  search params
     * @memberof SubscriptionContainerComponent
     */
    public sortBy(column) {
        if (column === this.subscriptionRequest.sortBy) {
            this.subscriptionRequest.sortType = (this.subscriptionRequest.sortType === "asc") ? "desc" : "asc";
        } else {
            this.subscriptionRequest.sortType = "asc";
        }

        this.subscriptionRequest.sortBy = column;
        if (this.isFromAdvanceSearchRes) {
            this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
        } else {
            this.getSubscriptionData(this.subscriptionRequest);
        }
    }

    /**
     * To search input box closed
     *
     * @memberof SubscriptionContainerComponent
     */
    public hideOpenedSearchBox() {
        if (this.inlineSearch) {
            this.inlineSearch = null;
        }
    }

    /**
     * This function is used to add fixed class to body to remove veritical scrolling on page
     *
     * @memberof PlansComponent
     */
    public toggleBodyClass() {
        if (this.togglePlanDetailsPanelBool || this.togglePanelBool) {
            document.querySelector('body').classList.add('fixed');
        } else {
            document.querySelector('body').classList.remove('fixed');
        }
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
            }
        });
    }

    /**
     * Selected status array list prepare
     *
     * @param {string} type
     * @param {*} event
     * @memberof SubscriptionContainerComponent
     */
    public checkedStatus(type: string, event) {
        if (event.target.checked) {
            if (this.selectedPlanStatusType.indexOf(type) === -1) {
                this.selectedPlanStatusType.push(type);
            }
        } else {
            let index = this.selectedPlanStatusType.indexOf(type);
            this.selectedPlanStatusType.splice(index, 1)
        }
        this.advanceSearchRequest.status = this.selectedPlanStatusType;
        this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
        this.isAllPlansStatusSelected();
    }

    /**
     * selected plan name array prepare 
     *
     * @param {*} item
     * @param {*} event
     * @memberof SubscriptionContainerComponent
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
        this.advanceSearchRequest.planUniqueNames = this.selectedPlans;
        this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
        this.isAllPlansSelected();
    }

    /**
     * To prepare array of selected all plans
     *
     * @param {*} event
     * @memberof SubscriptionContainerComponent
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
        this.advanceSearchRequest.planUniqueNames = this.selectedPlans;
        this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
    }

    /**
     * To prepare arrya of selected plan status
     *
     * @param {*} event event types
     * @memberof SubscriptionContainerComponent
     */
    public selectAllPlansStatus(event) {
        this.selectedPlanStatusType = [];
        if (event.target.checked) {
            this.selectedPlanStatusType = this.selectedAllPlanType;
            this.isAllPlansTypeChecked(true);
        } else {
            this.selectedPlanStatusType = []
            this.isAllPlansTypeChecked(false);
        }
        this.isAllPlansStatusSelected();
        this.advanceSearchRequest.status = this.selectedPlanStatusType;
        this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
    }

    /**
     * To check all plans selected or not
     *
     * @private
     * @memberof SubscriptionContainerComponent
     */
    private isAllPlansSelected() {
        if (this.allPlans.length === this.selectedPlans.length) {
            // this.isAllPlansSelected$ = observableOf(true);
            this.isAllPlanSelected = true;

        } else {
            // this.isAllPlansSelected$ = observableOf(false);
            this.isAllPlanSelected = false;

        }
    }

    /**
     * To check set and reset plan status model
     *
     * @private
     * @param {boolean} [isAllStatus] Boolean to check all plans selected 
     * @memberof SubscriptionContainerComponent
     */
    private isAllPlansTypeChecked(isAllStatus?: boolean) {
        if (isAllStatus !== undefined) {
            if (isAllStatus) {
                this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = true;
            } else {
                this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = false;
            }
        }
        this.isAllPlansStatusSelected()
    }

    /**
     * To check all plans status selected
     *
     * @memberof SubscriptionContainerComponent
     */
    public isAllPlansStatusSelected() {
        if (this.selectedPlanStatusType.length === 3) {
            this.isAllPlanTypeSelected = true;
        } else {
            this.isAllPlanTypeSelected = false;
        }
    }

    /**
     * This will hide the update transactions popup
     *
     * @memberof SubscriptionContainerComponent
     */
    public hideUpdateTransactionPopup(): void {
        this.openUpdateTransactionPopup = false;
        this.editSubscriptionIdTransaction = '';
        if (this.isFromAdvanceSearchRes) {
            this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
        } else {
            this.getSubscriptionData(this.subscriptionRequest);
        }
    }

    /**
     * This will set the subscription id to be used in popup
     *
     * @param {*} subscriptionId
     * @memberof SubscriptionContainerComponent
     */
    public editSubscriptionTransactions(subscriptionId) {
        this.editSubscriptionIdTransaction = subscriptionId;
    }

    /**
     * This will hide the assign plan popup
     *
     * @memberof SubscriptionContainerComponent
     */
    public hideAssignPlanPopup(): void {
        this.openAssignPlanPopup = false;
        if (this.isFromAdvanceSearchRes) {
            this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
        } else {
            this.getSubscriptionData(this.subscriptionRequest);
        }
    }
}