import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminActions } from '../../../actions/admin.actions';
import { UserService } from '../../../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppState } from '../../../store';
import { CommonPaginatedRequest, SubscriberList } from '../../../modules/modules/api-modules/subscription';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
    @ViewChild('userNameField') public userNameField;
    @ViewChild('userEmailField') public userEmailField;
    @ViewChild('userMobileField') public userMobileField;
    @ViewChild('userSubscriptionField') public userSubscriptionField;

    public modalRef: BsModalRef;
    // modalRefEdit: BsModalRef;
    public expandList = false;
    public openExpanList = '';
    public displayMonths = 2;
    public navigation = 'select';
    public showWeekNumbers = false;
    public outsideDays = 'visible';
    public userSubscriptionData = [];
    public getUserListRequest: any = {};
    public getUserListPostRequest: any = {};
    public userlistRes: SubscriberList = new SubscriberList();
    public inlineSearch: any = '';
    public timeout: any;
    public subscriptionId: any = '';
    public bsValue: any = '';
    public defaultLoad: boolean = true;

    destroyed$: Observable<any>;
    public onclick(id: string) {
        this.openExpanList = id;
        this.expandList = !this.expandList;
    }

    constructor(private store: Store<AppState>, private adminActions: AdminActions, private generalService: GeneralService, private userService: UserService, private modalService: BsModalService, private router: Router) {

    }

    /**
     * Initializes the component
     *
     * @memberof UserListComponent
     */
    ngOnInit() {
        let currentUrl = this.router.url;
        this.generalService.setCurrentPageTitle(currentUrl);
        this.getUserListRequest.count = 50;
        this.getUserListRequest.page = 1;
        this.getUserListRequest.sortBy = 'User';
        this.getUserListRequest.sortType = 'desc';
        this.getAllUserData();
    }

    /**
     * This function is used to put focus on column search
     *
     * @param {*} inlineSearch
     * @memberof UserListComponent
     */
    public focusOnColumnSearch(inlineSearch) {
        this.inlineSearch = inlineSearch;

        setTimeout(() => {
            if (this.inlineSearch === 'userName') {
                this.userNameField.nativeElement.focus();
            }
            if (this.inlineSearch === 'userEmail') {
                this.userEmailField.nativeElement.focus();
            }
            if (this.inlineSearch === 'userMobile') {
                this.userMobileField.nativeElement.focus();
            }
            if (this.inlineSearch === 'userSubscription') {
                this.userSubscriptionField.nativeElement.focus();
            }
        }, 200);
    }

    /**
     * This function is used to get user list
     *
     * @memberof UserListComponent
     */
    public getAllUserData() {
        this.userService.getAllSubscriptionsByUser(this.getUserListRequest, this.getUserListPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.userlistRes = res.body;
                this.userSubscriptionData = [];

                res.body.results.forEach(key => {
                    let signUpDate = key.userDetails.signUpOn.split(" ");
                    key.userDetails.signUpOn = signUpDate[0].replace(/-/g, "/");
                    this.userSubscriptionData.push(key);
                });
            }
        });
    }

    /**
     * This function is used to change page
     *
     * @param {*} event
     * @memberof UserListComponent
     */
    public pageChanged(event: any): void {
        this.getUserListRequest.page = event.page;
        this.getAllUserData();
    }

    /**
     * This function is used to apply sorting on columns
     *
     * @param {*} column
     * @memberof UserListComponent
     */
    public sortBy(column) {
        if (column === this.getUserListRequest.sortBy) {
            this.getUserListRequest.sortType = (this.getUserListRequest.sortType === "asc") ? "desc" : "asc";
        } else {
            this.getUserListRequest.sortType = "asc";
        }

        this.userlistRes.totalItems = 0;
        this.getUserListRequest.page = 1;
        this.getUserListRequest.sortBy = column;
        this.getAllUserData();
    }

    /**
     * This function is used to filter by date
     *
     * @param {*} dates
     * @memberof UserListComponent
     */
    public onChangeFilterDate(dates: any) {
        if (dates !== null && !this.defaultLoad) {
            this.getUserListPostRequest.signUpOnFrom = moment(dates[0]).format("DD-MM-YYYY");
            this.getUserListPostRequest.signUpOnTo = moment(dates[1]).format("DD-MM-YYYY");
            this.getAllUserData();
        }

        if (dates !== null && this.defaultLoad) {
            this.defaultLoad = false;
        }
    }

    /**
     * This function is used to get users by search
     *
     * @memberof UserListComponent
     */
    public columnSearch(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.getUserListRequest.page = 1;
            this.getAllUserData();
        }, 700);
    }

    /**
     * This function is used to open subscription modal
     *
     * @param {TemplateRef<any>} template
     * @param {*} subscriptionId
     * @memberof UserListComponent
     */
    public openSubscriptionModal(template: TemplateRef<any>, subscriptionId) {
        this.subscriptionId = subscriptionId;
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
        );
    }

    /**
     * This function is used to reset filters
     *
     * @memberof UserListComponent
     */
    public resetFilters() {
        this.bsValue = null;
        this.getUserListPostRequest.signUpOnFrom = '';
        this.getUserListPostRequest.signUpOnTo = '';
        this.getAllUserData();
    }
}