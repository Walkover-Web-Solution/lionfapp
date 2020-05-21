import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubscriberList, PAGINATION_COUNT, TotalUsersCount, CommonPaginatedRequest, StatusModel } from '../../../modules/modules/api-modules/subscription';
import * as moment from 'moment/moment';
import { GeneralService } from '../../../services/general.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { IOption } from '../../../theme/ng-select/ng-select';
import { PlansService } from '../../../services/plan.service';
import { GIDDH_DATE_FORMAT } from '../../../shared/defalutformatter/defaultDateFormat';
import { AuthenticationService } from '../../../services/authentication.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { cloneDeep } from '../../../lodash-optimized';
import { ColumnFilterService } from '../../../services/column-filter.service';
import { FavouriteColumnPageTypeEnum } from '../../../actions/general/general.const';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { UserFieldFilterColumnNames } from '../../../models/company';
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
    public showCountryPopup: boolean = false;
    public showStatusPopups: boolean = false;
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
    public today: Date;
    public bsConfig: any = { dateInputFormat: GIDDH_DATE_FORMAT, displayMonths: 1 };
    /** Country list */
    public countrySource: IOption[] = [];
    /** Selected countries list */
    public selectedCountries: string[] = [];
    /** True, if all country selected */
    public isAllCountrySelected: boolean = false;
    /** selected Plan status array */
    public selectedPlanStatus: string[] = [];
    public selectedAllPlanType = ['trial', 'active', 'expired'];
    public planStatusType: StatusModel = {
        trial: false,
        active: false,
        expired: false
    };
    public showClearFilter: boolean = false;

    @ViewChild('filterDropDownList') public filterDropDownList: BsDropdownDirective;
    public showFieldFilter: UserFieldFilterColumnNames = new UserFieldFilterColumnNames();
    public isFieldColumnFilterApplied: boolean;
    public isAllFieldColumnFilterApplied: boolean;

    public isAllPlanStatusSelected: boolean = false;
    public searchViaEmail$ = new Subject<string>();
    public searchViaUserName$ = new Subject<string>();
    public searchViaMobileNo$ = new Subject<string>();
    public searchViaSubscriptionID$ = new Subject<string>();
    public searchViaSubscribedOn$ = new Subject<string>();



    destroyed$: Observable<any>;
    public onclick(id: string) {
        this.openExpanList = id;
        this.expandList = !this.expandList;
    }

    constructor(private generalService: GeneralService, private userService: UserService, private modalService: BsModalService, private router: Router, private toaster: ToasterService, private plansService: PlansService, private authenticationService: AuthenticationService, private columnFilterService: ColumnFilterService) {
        this.today = new Date();
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
        this.getOnboardCountries();

        /** Search using user name  */
        this.searchViaUserName$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            if (term) {
                this.showClearFilter = true;
            }
            this.getUserListPostRequest.userName = term.trim();

            this.getAllSubscriptionTotalData();
            this.getAllUserData();
        });

        /** Search using subscription ID  */

        this.searchViaSubscriptionID$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            if (term) {
                this.showClearFilter = true;
            }
            this.getUserListPostRequest.subscriptionId = term.trim();
            this.getAllSubscriptionTotalData();
            this.getAllUserData();
        });

        /** Search using email id  */

        this.searchViaEmail$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {

            if (term) {
                this.showClearFilter = true;
            }
            this.getUserListPostRequest.email = term.trim();

            this.getAllSubscriptionTotalData();
            this.getAllUserData();
        });

        /** Search using mobile number  */

        this.searchViaMobileNo$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            if (term) {
                this.showClearFilter = true;
            }
            this.getUserListPostRequest.mobile = term.trim();
            this.getAllSubscriptionTotalData();
            this.getAllUserData();
        });
        /** To get dynamic column filter  */
        this.getColumnFilter();
    }

    /**
     * Tax input focus handler
     *
     * @memberof UserListComponent
     */
    public handleInputFocus(columnType: string, isShow: boolean): void {
        if (columnType === 'plan') {
            this.showTaxPopup = isShow ? false : true;

        } else if (columnType === 'status') {
            this.showStatusPopups = isShow ? false : true;

        }
    }

    /**
    *  API call to serach by plans subscribed date
    * 
    * @memberof UserListComponent
    */
    public searchViaSubscribedOn() {
        this.getUserListPostRequest.startedAtFrom = this.getUserListPostRequest.startedAtFrom ? moment(this.getUserListPostRequest.startedAtFrom).format(GIDDH_DATE_FORMAT) : '';
        this.showClearFilter = true;
        this.getAllSubscriptionTotalData();
        this.getAllUserData();
    }

    /**
     * This will hide/show the owner popup
     *
     * @param {boolean} isShow
     * @memberof UserListComponent
     */
    public ownerFocus(isShow: boolean): void {
        this.owner = isShow ? false : true;
    }

    /**
     * This will hide/show the last seen filter option
     *
     * @param {boolean} isShow
     * @memberof UserListComponent
     */
    public lastSeenDropdown(isShow: boolean): void {
        this.lastSeen = isShow ? false : true;
    }

    /**
    * This will hide/show the country filter option
    *
    * @param {boolean} isShow
    * @memberof UserListComponent
    */
    public countryDropdown(isShow: boolean): void {
        this.showCountryPopup = isShow ? false : true;
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
                    if (key.userDetails) {
                        key.lastSeenConvertedDate = this.changeTimeStampToDate(key.userDetails.lastSeen);
                    }
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
            this.getUserListPostRequest.signUpOnFrom = moment(dates[0]).format(GIDDH_DATE_FORMAT);
            this.getUserListPostRequest.signUpOnTo = moment(dates[1]).format(GIDDH_DATE_FORMAT);
            this.getAllSubscriptionTotalData();
            this.getAllUserData();
        }

        if (dates !== null && this.defaultLoad) {
            this.defaultLoad = false;
        }
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
        this.getUserListPostRequest.startedAtFrom = '';
        this.getUserListPostRequest.email = '';
        this.getUserListPostRequest.mobile = '';
        this.getUserListPostRequest.subscriptionId = '';
        this.getUserListPostRequest.planUniqueNames = [];
        this.getUserListPostRequest.countryCodes = this.selectedCountries = [];
        this.getUserListPostRequest.startedAtFrom = '';
        this.getUserListRequest.sortBy = '';
        this.getUserListRequest.sortType = '';
        this.inlineSearch = null;
        this.allPlans.forEach(res => {
            res.additional = false;
        });
        this.countrySource.forEach(res => {
            res.additional = false;
        });
        this.isAllPlanSelected = false;
        this.getUserListRequest.page = 1;
        this.getAllSubscriptionTotalData();
        this.getAllUserData();
    }

    /**
     * API call to get all user footer data
     *
     * @memberof UserListComponent
     */
    public getAllSubscriptionTotalData() {
        this.userService.getAllUserCounts(this.getUserListPostRequest).subscribe(res => {
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
        this.getAllSubscriptionTotalData();
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
        this.getAllSubscriptionTotalData();
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
        this.getAllSubscriptionTotalData();
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
        this.getAllSubscriptionTotalData();
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
            this.getAllSubscriptionTotalData();
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
            this.getUserListPostRequest.lastSeen.from = moment(date[0]).format(GIDDH_DATE_FORMAT);
            this.getUserListPostRequest.lastSeen.to = moment(date[1]).format(GIDDH_DATE_FORMAT);
        } else if (value === "UNAVAILABLE" || value === "AVAILABLE") {
            this.getUserListPostRequest.lastSeen.from = '';
            this.getUserListPostRequest.lastSeen.to = '';
        } else {
            this.getUserListPostRequest.lastSeen.from = moment(date).format(GIDDH_DATE_FORMAT);
            this.getUserListPostRequest.lastSeen.to = '';
        }
        this.getUserListRequest.page = 1;
        this.lastSeenDropdown(true);
        this.getAllSubscriptionTotalData();
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
                this.getAllSubscriptionTotalData();
                this.getAllUserData();
            } else {
                this.toaster.errorToast(res.message);
            }
        });
    }

    /**
     * To change time stamp into date as Mar 19, 2020 at 10:34AM
     *
     * @private
     * @param {*} timeStamp
     * @returns {string}
     * @memberof UserListComponent
     */
    private changeTimeStampToDate(timeStamp): string {
        let convertedDate: string = '';
        let dateSplitedArray: Array<any>;
        let hours;
        let minutes;
        let newformat;
        if (timeStamp) {
            let date = new Date(timeStamp);
            dateSplitedArray = new Date(timeStamp).toDateString().split(' ');// "Tue Mar 17 2020"
            hours = date.getHours();
            minutes = date.getMinutes();
            // To check whether AM or PM 
            newformat = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            // To display "0" as "12" 
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            if (dateSplitedArray.length) {
                convertedDate = dateSplitedArray[1] + ' ' + dateSplitedArray[2] + ', ' + dateSplitedArray[3] + ' at ' + hours + ':' + minutes + newformat;
            }
        }
        return convertedDate;
    }

    /**
    * API call to get all onboarding countries
    *
    * @memberof UserListComponent
    */
    public getOnboardCountries() {
        this.authenticationService.getCountry().subscribe(res => {
            if (res.status === 'success') {
                if (res.body && res.body.length > 0) {
                    res.body.forEach(key => {
                        this.countrySource.push({ label: key.countryName, value: key.alpha2CountryCode, additional: false });
                    });
                }
            } else {
                this.toaster.clearAllToaster();
                this.toaster.errorToast(res.message);
            }
        });
    }

    /**
    * To check all country selected or not
    *
    * @memberof UserListComponent
    */
    public isAllCountriesSelected() {
        if (this.countrySource.length === this.selectedCountries.length) {
            this.isAllCountrySelected = true;
        } else {
            this.isAllCountrySelected = false;
        }
    }

    /**
     * Prepare array of selected country for all country selected
     *
     * @param {*} event Click event
     * @memberof UserListComponent
     */
    public selectAllCountry(event) {
        this.selectedCountries = [];
        if (event.target.checked) {
            this.countrySource.forEach(res => {
                this.selectedCountries.push(res.value);
            });
            this.countrySource.map(res => {
                res.additional = true;
            });
        } else {
            this.selectedCountries = [];
            this.countrySource.map(res => {
                res.additional = false;
            });
        }
        this.isAllCountriesSelected();
        this.getUserListPostRequest.countryCodes = this.selectedCountries;
        this.getAllUserData();
        // this.getAllPlans();
    }

    /**
    *  To prepare array of selectd country
    *
    * @param {*} item Country selected item
    * @param {*} event Click event
    * @memberof UserListComponent
    */
    public checkedCountryName(item, event) {
        if (event.target.checked) {
            if (this.selectedCountries.indexOf(item.value) === -1) {
                this.selectedCountries.push(item.value);
            }
        } else {
            let index = this.selectedCountries.indexOf(item.value);
            this.selectedCountries.splice(index, 1);
        }
        this.getUserListPostRequest.countryCodes = this.selectedCountries;
        this.isAllCountriesSelected();
        this.getAllUserData();
        // this.getAllPlans();
    }

    /**
  * To check All plans status check
  *
  * @param {*} event Event for All plan select checkbox
  * @memberof UserListComponent
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
        this.getUserListPostRequest.status = this.selectedPlanStatus;
        this.getAllUserData();
    }

    /**
         * To check all plan status selected or not
         *
         * @memberof UserListComponent
         */
    public isAllPlanStatusTypeSelected() {
        if (this.selectedPlanStatus.length === 3) {
            this.isAllPlanStatusSelected = true;
        } else {
            this.isAllPlanStatusSelected = false;
        }
    }

    /**
  * Tp prepare array of selected status
  *
  * @param {string} type plan status type
  * @param {*} event Event
  * @memberof UserListComponent
  */
    public checkedPlanStatus(type: string, event) {
        if (event.target.checked) {
            if (this.selectedPlanStatus.indexOf(type) === -1) {
                this.selectedPlanStatus.push(type);
                // this.showClearFilter = true;
            }
        } else {
            let index = this.selectedPlanStatus.indexOf(type);
            this.selectedPlanStatus.splice(index, 1)
        }
        this.isAllPlansSelected();
        this.getUserListPostRequest.status = this.selectedPlanStatus;
        this.getAllUserData();
    }

    /**
    * To reset status type model
    * 
    * @private
    * @param {boolean} [isAllStatus] Boolean to check is all plan statu selected or not
    * @memberof UserListComponent
    */
    private isAllPlansStatusSelected(isAllStatus?: boolean) {
        if (isAllStatus) {
            this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = true;
        } else {
            this.planStatusType.active = this.planStatusType.expired = this.planStatusType.trial = false;
        }
        this.isAllPlanStatusTypeSelected();
    }
    // Column filter methods
    public hideListItems() {
        this.filterDropDownList.hide();
    }

    /**
 * This will toggle all columns
 *
 * @param {boolean} event
 * @memberof UserListComponent
 */
    public selectAllColumns(event: boolean): void {
        this.showFieldFilter.addOnTransaction = event;
        this.showFieldFilter.additionalCharges = event;
        this.showFieldFilter.country = event;
        this.showFieldFilter.email = event;
        this.showFieldFilter.expiry = event;
        this.showFieldFilter.lastSeen = event;
        this.showFieldFilter.mobile = event;
        this.showFieldFilter.name = event;
        this.showFieldFilter.noOfCompany = event;
        this.showFieldFilter.owner = event;
        this.showFieldFilter.planName = event;
        this.showFieldFilter.ratePerTransaction = event;
        this.showFieldFilter.remainingTransaction = event;
        this.showFieldFilter.signUpOn = event;
        this.showFieldFilter.status = event;
        this.showFieldFilter.subscribedOn = event;
        this.showFieldFilter.subscriptionId = event;
        this.showFieldFilter.totalAmount = event;
        this.showFieldFilter.transactionLimit = event;
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
     * @memberof UserListComponent
     */
    public columnFilter(event: boolean, column: string) {
        this.showFieldFilter[column] = event;
        this.updateColumnFilter();
    }

    /**
     *To check is any column toggle filter applied
     *
     * @returns {boolean}
     * @memberof UserListComponent
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

    /**
    * API call to get all filter column
    *
    * @memberof UserListComponent
    */
    public getColumnFilter(): void {
        this.columnFilterService.getFavouritePage(FavouriteColumnPageTypeEnum.ADMIN_USER).subscribe(response => {
            if (response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
                this.getShowFieldFilterIsApplied();
            } else if (response.status === 'error') {
                this.toaster.errorToast(response.message);
            }
        });

    }

    /**
      * API call to update filter column
      *
      * @memberof UserListComponent
      */
    public updateColumnFilter(): void {
        this.getShowFieldFilterIsApplied();
        this.columnFilterService.updateFavouritePage(FavouriteColumnPageTypeEnum.ADMIN_USER, this.showFieldFilter).subscribe(response => {
            if (response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
            }
        });
    }

}