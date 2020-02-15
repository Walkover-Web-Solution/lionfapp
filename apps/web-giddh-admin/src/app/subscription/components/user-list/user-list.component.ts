import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubscriberList, PAGINATION_COUNT, TotalUsersCount } from '../../../modules/modules/api-modules/subscription';
import * as moment from 'moment/moment';
import { GeneralService } from '../../../services/general.service';
import { Router } from '@angular/router';

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
    public totalUsers: TotalUsersCount;

    destroyed$: Observable<any>;
    public onclick(id: string) {
        this.openExpanList = id;
        this.expandList = !this.expandList;
    }

    constructor(private generalService: GeneralService, private userService: UserService, private modalService: BsModalService, private router: Router) {

    }

    /**
     * Initializes the component
     *
     * @memberof UserListComponent
     */
    ngOnInit() {
        this.generalService.setCurrentPageTitle("Users");
        this.getUserListRequest.count = PAGINATION_COUNT;
        this.getUserListRequest.page = 1;
        this.getUserListRequest.sortBy = 'User';
        this.getUserListRequest.sortType = 'desc';
        this.getAllUserData();
        this.getAllSubscriptionTotalData();
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
    public openEditSubscription(subscriptionId) {
        this.subscriptionId = subscriptionId;
        this.router.navigate([`admin/subscription/edit/${subscriptionId}`]);
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
        this.getUserListPostRequest.userName = '';
        this.getUserListPostRequest.email = '';
        this.getUserListPostRequest.mobile = '';
        this.getUserListPostRequest.subscriptionId = '';
        this.getUserListRequest.sortBy = 'User';
        this.getUserListRequest.sortType = 'desc';
        this.inlineSearch = null;
        this.getAllUserData();
    }

/**
 * API call to get all user footer data
 *
 * @memberof UserListComponent
 */
public getAllSubscriptionTotalData() {
        this.userService.getAllUserCounts().subscribe(res => {
            if (res.status === 'success') {
                this.totalUsers = res.body;
            } else {
                //  this.toasty.errorToast(res.message)
            }
        });
    }
}