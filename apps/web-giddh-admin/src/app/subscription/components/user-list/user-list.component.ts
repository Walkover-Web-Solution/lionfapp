import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubscriberList, PAGINATION_COUNT, TotalUsersCount, CommonPaginatedRequest } from '../../../modules/modules/api-modules/subscription';
import * as moment from 'moment/moment';
import { GeneralService } from '../../../services/general.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { IOption } from '../../../theme/ng-select/ng-select';
import { PlansService } from '../../../services/plan.service';
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
    @Input() public showTaxPopup: boolean = false;
    @Input() public lastSeen: boolean = false;
    @Input() public owner: boolean = false;

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
    public allPlans: IOption[] = [];
    public selectedPlans: string[] = [];
    public isAllPlanSelected: boolean = false;
    public getAllPlansPostRequest: any = {};
    public getAllPlansRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public timeoutLastSeen: any;
    public tempOperation: any = "";
    @ViewChild("dp") public dp;
    public adminUsersList: any;
    public isAllOwnerSelected: boolean = false;
    public selectedOwners: string[] = [];

    destroyed$: Observable<any>;
    public onclick(id: string) {
        this.openExpanList = id;
        this.expandList = !this.expandList;
    }

    constructor(private generalService: GeneralService, private userService: UserService, private modalService: BsModalService, private router: Router, private toaster: ToasterService, private plansService: PlansService) {
        this.getUserListPostRequest.lastSeen = {};
        this.getUserListPostRequest.lastSeen.operation = "BEFORE";
        this.tempOperation = "relative_before";
        this.getAllAdminUsers();
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
        this.getUserListRequest.sortBy = '';
        this.getUserListRequest.sortType = '';
        this.getAllUserData();
        this.getAllSubscriptionTotalData();
        this.getAllPlans();
    }

    /**
     * Tax input focus handler
     *
     * @memberof TaxControlComponent
     */
    public handleInputFocus(isShow: boolean): void {
        this.showTaxPopup = isShow ? false : true;
    }

    public ownerFocus(isShow: boolean): void {
        this.owner = isShow ? false : true;
    }

    public lastSeenDropdown(isShow: boolean): void {
        this.lastSeen = isShow ? false : true;

        if (this.lastSeen && (this.tempOperation === "absolute_after" || this.tempOperation === "absolute_before" || this.tempOperation === "absolute_on" || this.tempOperation === "absolute_between")) {
            this.dp.show();
        }
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
            } else {
                this.userlistRes = new SubscriberList();
                this.userSubscriptionData = [];
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
        if (this.getUserListRequest.page !== event.page) {
            this.getUserListRequest.page = event.page;
            this.getAllUserData();
        }
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
        this.tempOperation = 'relative_before';
        this.getUserListPostRequest.lastSeen = {};
        this.getUserListPostRequest.lastSeen.operation = 'relative_before';
        this.getUserListPostRequest.lastSeen.from = '';
        this.getUserListPostRequest.lastSeen.to = '';
        this.getUserListPostRequest.lastSeen.days = '';
        this.getUserListPostRequest.signUpOnFrom = '';
        this.getUserListPostRequest.signUpOnTo = '';
        this.getUserListPostRequest.userName = '';
        this.getUserListPostRequest.email = '';
        this.getUserListPostRequest.mobile = '';
        this.getUserListPostRequest.subscriptionId = '';
        this.getUserListPostRequest.planUniqueNames = [];
        this.getUserListRequest.sortBy = '';
        this.getUserListRequest.sortType = '';
        this.inlineSearch = null;
        this.allPlans.forEach(res => {
            res.additional = false;
        });
        this.isAllPlanSelected = false;
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
                this.toaster.errorToast(res.message)
            }
        });
    }

    /**
    * To prepare array of selectd plans
    *
    * @param {*} item  plan name
    * @param {*} event Event
    * @memberof UserListComponent
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
        this.getUserListPostRequest.planUniqueNames = this.selectedPlans;
        this.isAllPlansSelected();
        this.getAllUserData();
    }


    /**
     * To check all plan selected or not
     *
     * @private
     * @memberof UserListComponent
     */
    private isAllPlansSelected() {
        if (this.allPlans.length === this.selectedPlans.length) {
            this.isAllPlanSelected = true;
        } else {
            this.isAllPlanSelected = false;
        }
    }

    /**
    *  To check if any plan selected
    *
    * @param {*} event Event for checkbox
    * @memberof UserListComponent
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
        this.getUserListPostRequest.planUniqueNames = this.selectedPlans;
        this.getAllUserData();
    }

    /**
     * To filter based on selected owner
     *
     * @param {*} item
     * @param {*} event
     * @memberof UserListComponent
     */
    public checkedOwnerName(item, event) {
        if (event.target.checked) {
            if (this.selectedOwners.indexOf(item.uniqueName) === -1) {
                this.selectedOwners.push(item.uniqueName);
            }
        } else {
            let index = this.selectedOwners.indexOf(item.uniqueName);
            this.selectedOwners.splice(index, 1);
        }
        this.getUserListPostRequest.managerUniqueNames = this.selectedOwners;
        this.isAllOwnersSelected();
        this.getAllUserData();
    }

    /**
     * To check if select all is checked
     *
     * @private
     * @memberof UserListComponent
     */
    private isAllOwnersSelected() {
        if (this.adminUsersList.length === this.selectedOwners.length) {
            this.isAllOwnerSelected = true;
        } else {
            this.isAllOwnerSelected = false;
        }
    }

    /**
     * To select all owners
     *
     * @param {*} event
     * @memberof UserListComponent
     */
    public selectAllOwners(event) {
        this.selectedOwners = [];
        if (event.target.checked) {
            this.adminUsersList.forEach(res => {
                this.selectedOwners.push(res.uniqueName);
            });
            this.adminUsersList.map(res => {
                res.additional = true;
            });
        } else {
            this.selectedOwners = [];
            this.adminUsersList.map(res => {
                res.additional = false;
            });
        }
        this.isAllOwnersSelected();
        this.getUserListPostRequest.managerUniqueNames = this.selectedOwners;
        this.getAllUserData();
    }

    /**
    * This function is used to get all plans to show in dropdown
    *
    * @memberof UserListComponent
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
                this.toaster.clearAllToaster();
                this.toaster.errorToast("Something went wrong in getting plans! Please try again.");
            }
        });
    }

    /**
     * This will filter the user list based on last seen days
     *
     * @param {string} value
     * @memberof UserListComponent
     */
    public onLastSeenDaysChange(value): void {
        if (this.timeoutLastSeen) {
            clearTimeout(this.timeoutLastSeen);
        }

        this.getUserListPostRequest.lastSeen.operation = value;

        this.timeoutLastSeen = setTimeout(() => {
            this.lastSeenDropdown(true);
            this.getUserListRequest.page = 1;
            this.getAllUserData();
            clearTimeout(this.timeoutLastSeen);
        }, 700);
    }

    /**
     * This will filter the user list based on last seen date(s)
     *
     * @param {*} date
     * @param {string} value
     * @memberof UserListComponent
     */
    public onLastSeenDateChange(date: any, value: string): void {
        this.getUserListPostRequest.lastSeen.operation = value;

        if (value === "BETWEEN") {
            this.getUserListPostRequest.lastSeen.from = moment(date[0]).format("DD-MM-YYYY");
            this.getUserListPostRequest.lastSeen.to = moment(date[1]).format("DD-MM-YYYY");
        } else if (value === "UNAVAILABLE" || value === "AVAILABLE") {
            this.getUserListPostRequest.lastSeen.from = '';
            this.getUserListPostRequest.lastSeen.to = '';
        } else {
            this.getUserListPostRequest.lastSeen.from = moment(date[0]).format("DD-MM-YYYY");
            this.getUserListPostRequest.lastSeen.to = '';
        }
        this.getUserListRequest.page = 1;
        this.getAllUserData();
    }

    /**
     * This will reset the last seen filters
     *
     * @memberof UserListComponent
     */
    public resetLastSeenFilter(): void {
        this.getUserListPostRequest.lastSeen.days = '';
        this.getUserListPostRequest.lastSeen.from = '';
        this.getUserListPostRequest.lastSeen.to = '';
    }

    /**
     * This will get the list of all admin users
     *
     * @memberof UserListComponent
     */
    public getAllAdminUsers() {
        this.userService.getAllAdminUsers().subscribe(res => {
            if (res.status === 'success' && res.body) {
                this.adminUsersList = res.body;
            } else {
                this.adminUsersList = [];
            }
        });
    }

    /**
     * This will assign the lead to admin user
     *
     * @param {string} userUniqueName
     * @param {string} leadOwnerUniqueName
     * @memberof UserListComponent
     */
    public assignLeadOwner(userUniqueName: string, leadOwnerUniqueName: string) {
        let post = { managerUserUniqueName: leadOwnerUniqueName };

        this.userService.assignLeadOwner(userUniqueName, post).subscribe(res => {
            if (res.status === 'success') {
                this.toaster.successToast(res.body);
                this.getAllUserData();
            } else {
                this.toaster.errorToast(res.message);
            }
        });
    }
}