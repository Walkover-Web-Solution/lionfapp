import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SubscriptionService } from '../../../services/subscription.service';
import { AppState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { takeUntil, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';
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
    public selectedStatus: string[] = [];
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

    public status: StatusModel = {
        trial: false,
        active: false,
        expired: false
    }
    
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
    /**
     * To reset Advance search request component
     *
     * @memberof SubscriptionContainerComponent
     */
    public resetAdvanceSearch() {
        this.advanceSearchRequest.signUpOnFrom = '';
        this.advanceSearchRequest.startedAtFrom = '';
        this.advanceSearchRequest.subscriptionId = '';

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
        this.subscriptionRequest.sortBy = 'ADDITIONAL_TRANSACTIONS';
        this.subscriptionRequest.sortType = 'desc';
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
            this.getAdvancedSearchedSubscriptions(this.searchedAdvancedRequestModelByAdvanceSearch);
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
        this.selectedStatus = []
        this.status.active = this.status.expired = this.status.trial = false;
        this.allPlans.forEach(res=> {
            res.additional = false;
        })
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
            this.getAdvancedSearchedSubscriptions(this.searchedAdvancedRequestModelByAdvanceSearch);
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
        this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
        this.getAllPlansRequest.sortType = 'desc';
        this.plansService.getAllPlans(this.getAllPlansRequest, this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.allPlans = [];
                res.body.results.forEach(key => {
                    this.allPlans.push({ label: key.name, value: key.uniqueName , additional: false });
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
            if (this.selectedStatus.indexOf(type) === -1) {
                this.selectedStatus.push(type);
            }
        } else {
            let index = this.selectedStatus.indexOf(type);
            this.selectedStatus.splice(index, 1)
        }
        this.advanceSearchRequest.status = this.selectedStatus;
        this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
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
        this.advanceSearchRequest.planUniqueName = this.selectedPlans;
        this.getAdvancedSearchedSubscriptions(this.advanceSearchRequest);
    }

}