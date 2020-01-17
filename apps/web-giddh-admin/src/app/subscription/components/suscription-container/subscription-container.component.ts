import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SubscriptionService } from '../../../services/subscription.service';
import { AppState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { takeUntil, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { CommonPaginatedRequest, SubscriberList, TotalSubscribers, AdvanceSearchRequestSubscriptions } from '../../../modules/modules/api-modules/subscription';
import { ToasterService } from '../../../services/toaster.service';
import * as moment from 'moment/moment';
import { GIDDH_DATE_FORMAT } from '../../../shared/defalutformatter/defaultDateFormat';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';


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



    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    public subscriberRes: SubscriberList = new SubscriberList();
    public subscriptionData = [];
    public rightToggle: boolean = false;
    public subscriptionRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public inlineSearch: any = '';
    public togglePanelBool: boolean;
    public totalSubscriber: TotalSubscribers;
    public advanceSearchRequest: AdvanceSearchRequestSubscriptions = {
        signUpOnFrom: '',
        subscriptionId: '',
        startedAtFrom: ''

    };

    constructor(private store: Store<AppState>, private adminActions: AdminActions, private toasty: ToasterService,
        private subscriptionService: SubscriptionService, private modalService: BsModalService, private router: Router, private generalService: GeneralService) {


    }
    /**
     *To navigate edit subscription 
     *
     * @param {*} subscriptionId
     * @memberof SubscriptionContainerComponent
     */
    public openEditSubscription(subscriptionId) {
        this.subscriptionId = subscriptionId;
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
        this.subscriptionRequest.count = 50;
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
                    this.subscriberRes = res.body;
                    this.subscriptionData = [];
                    res.body.results.forEach(key => {
                        key.userDetails.signUpOn = key.userDetails.signUpOn.split(" ")[0].replace(/-/g, "/");
                        key.startedAt = key.startedAt.replace(/-/g, "/")
                        this.subscriptionData.push(key);
                    });
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
        this.getSubscriptionData(this.subscriptionRequest);

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
        this.getSubscriptionData(this.subscriptionRequest);
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

}