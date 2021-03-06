import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { PlansService } from '../../services/plan.service';
import * as moment from 'moment/moment';
import { GeneralService } from '../../services/general.service';
import { ToasterService } from '../../services/toaster.service';
import { AuthenticationService } from '../../services/authentication.service';
import { IOption } from '../../theme/ng-select/ng-select';
import { PAGINATION_COUNT } from '../../modules/modules/api-modules/subscription';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { ColumnFilterService } from '../../services/column-filter.service';
import { FavouriteColumnPageTypeEnum } from '../../actions/general/general.const';
import { cloneDeep } from '../../lodash-optimized';
import { PlanFieldFilterColumnNames } from '../../models/company';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})

export class PlansComponent implements OnInit {
    @ViewChild('planNameField') public planNameField;
    @Input() public showTaxPopup: boolean = false;
    @Input() public showTaxPopups: boolean = false;
    @ViewChild('filterDropDownList') public filterDropDownList: BsDropdownDirective;
    public showFieldFilter: PlanFieldFilterColumnNames = new PlanFieldFilterColumnNames();
    public isFieldColumnFilterApplied: boolean;
    public isAllFieldColumnFilterApplied: boolean;
    public showClearFilter: boolean = false;
    public colSpanCount: number;

    public plansData: any;
    public plansDataResults: any;
    public getAllPlansRequest: any = {};
    public getAllPlansPostRequest: any = {};
    public searchViaPlanName$ = new Subject<string>();
    public togglePanelBool: boolean;
    public togglePlanDetailsPanelBool: boolean;
    public selectedPlan: any = '';
    public inlineSearch: any = '';
    public timeout: any;
    public bsValue: any = '';
    public defaultLoad: boolean = true;
    public planStates: any = {};
    public countrySource: IOption[] = [];
    public selectedCountries: string[] = []
    public isAllCountrySelected: boolean = false;
    public PAGINATION_COUNT: number = PAGINATION_COUNT;

    constructor(private plansService: PlansService, private generalService: GeneralService, private toaster: ToasterService, private authenticationService: AuthenticationService, private columnFilterService: ColumnFilterService) {
    }

    /**
     * Initializes the component
     *
     * @memberof PlansComponent
     */
    ngOnInit() {
        this.getAllPlansPostRequest.countries = [];
        this.generalService.setCurrentPageTitle("Plans");
        this.getAllPlansRequest.count = PAGINATION_COUNT;
        this.getPlansStates();
        // this.getAllPlans();
        this.getOnboardCountries();
        /** To get dynamic column filter  */
        this.getColumnFilter();

        /** Search using plan name  */
        this.searchViaPlanName$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(term => {
            if (term) {
                this.showClearFilter = true;
            }
            this.getAllPlansPostRequest.planName = term.trim();
            this.getAllPlans();
        });

        this.checkLocalStorageFilter();
    }

    /**
     * Tax input focus handler
     *
     * @memberof TaxControlComponent
     */
    public handleInputFocus(isShow: boolean): void {
        this.showTaxPopup = isShow ? false : true;
    }

    /**
     * This function is used to get all plans list
     *
     * @memberof PlansComponent
     */
    public getAllPlans() {
        this.getPlansStates();
        localStorage.setItem("planListFilter", JSON.stringify(this.getAllPlansPostRequest));
        localStorage.setItem("planPaginationFilter", JSON.stringify(this.getAllPlansRequest));
        this.plansService.getAllPlans(this.getAllPlansRequest, this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.plansData = res.body;
                this.plansDataResults = [];

                res.body.results.forEach(key => {
                    let createdAt = key.createdAt.split(" ");
                    key.createdAt = createdAt[0].replace(/-/g, "/");
                    this.plansDataResults.push(key);
                });
            }
        });
    }

    /**
     * This function is used to change page
     *
     * @param {*} event
     * @memberof PlansComponent
     */
    public pageChanged(event: any): void {
        this.getAllPlansRequest.page = event.page;
        this.getAllPlans();
    }

    /**
     * This function is used to toggle aside popup
     *
     * @memberof PlansComponent
     */
    public togglePanel() {
        if (this.togglePanelBool) {
            this.togglePanelBool = false;
        } else {
            this.togglePanelBool = true;
        }
        this.toggleBodyClass();
    }

    /**
     * This function is used to apply sorting on columns
     *
     * @param {*} column
     * @memberof PlansComponent
     */
    public sortBy(column) {
        if (column === this.getAllPlansRequest.sortBy) {
            this.getAllPlansRequest.sortType = (this.getAllPlansRequest.sortType === "asc") ? "desc" : "asc";
        } else {
            this.getAllPlansRequest.sortType = "asc";
        }

        this.plansData.totalItems = 0;
        this.getAllPlansRequest.page = 1;
        this.getAllPlansRequest.sortBy = column;
        this.getAllPlans();
    }

    /**
     * To hide column filter pop up
     *
     * @memberof PlansComponent
     */
    public hideListItems() {
        this.filterDropDownList.hide();
    }

    /**
     * This function is used to filter by date
     *
     * @param {*} dates
     * @memberof PlansComponent
     */
    public onChangeFilterDate(dates: any) {
        if (dates !== null && !this.defaultLoad) {
            this.getAllPlansPostRequest.createdAtFrom = moment(dates[0]).format("DD-MM-YYYY");
            this.getAllPlansPostRequest.createdAtTo = moment(dates[1]).format("DD-MM-YYYY");
            // this.getPlansStates();
            this.getAllPlans();
        }

        if (dates !== null && this.defaultLoad) {
            this.defaultLoad = false;
        }
    }

    /**
     * This function is used to put focus on column search
     *
     * @param {*} inlineSearch
     * @memberof PlansComponent
     */
    public focusOnColumnSearch(inlineSearch) {
        this.inlineSearch = inlineSearch;

        setTimeout(() => {
            if (this.inlineSearch === 'planName') {
                this.planNameField.nativeElement.focus();
            }
        }, 200);
    }

    /**
     * This function is used to hide aside popup
     *
     * @memberof PlansComponent
     */
    public hidePopup() {
        this.togglePanelBool = false;
        this.getAllPlansRequest.page = 1;
        // this.getPlansStates();
        this.getAllPlans();
        this.toggleBodyClass();
    }

    /**
     * This function is used to close plan details aside popup
     *
     * @memberof PlansComponent
     */
    public hidePlanDetailsPopup() {
        this.selectedPlan = '';
        this.togglePlanDetailsPanelBool = false;
        // this.getPlansStates();
        this.getAllPlans();
        this.toggleBodyClass();
    }

    /**
     * This function is used to reset filters
     *
     * @memberof PlansComponent
     */
    public resetFilters() {
        this.bsValue = null;
        this.getAllPlansRequest.page = 1;
        this.getAllPlansPostRequest.planName = '';
        this.getAllPlansPostRequest.createdAtFrom = '';
        this.getAllPlansPostRequest.createdAtTo = '';
        this.getAllPlansPostRequest.countries = this.selectedCountries = [];
        this.countrySource.forEach(res => {
            res.additional = false;
        });
        this.selectAllColumns(true);
        // this.getPlansStates();
        this.getAllPlans();
    }

    /**
     * This function is used to open plan details popup
     *
     * @param {*} uniqueName
     * @memberof PlansComponent
     */
    public showPlanDetails(uniqueName) {
        this.selectedPlan = uniqueName;
        this.togglePlanDetailsPanelBool = true;

        this.toggleBodyClass();
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
     * This function is used to get plans stats
     *
     * @memberof PlansComponent
     */
    public getPlansStates() {
        this.plansService.getPlansStates(this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.planStates = res.body;
            }
        });
    }

    /**
   * API call to get all onboarding countries
   *
   * @memberof GenerateKeyComponent
   */
    public getOnboardCountries() {
        this.authenticationService.getCountry().subscribe(res => {
            if (res.status === 'success') {
                this.countrySource = [];
                if (res.body && res.body.length > 0) {
                    res.body.forEach(key => {
                        this.countrySource.push({ label: key.countryName, value: key.alpha2CountryCode, additional: false });
                    });
                    this.checkLocalStorageFilter();
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
     * @memberof PlansComponent
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
     * @memberof PlansComponent
     */
    public selectAllCountry(event) {
        this.selectedCountries = [];
        if (event.target.checked) {
            this.countrySource.forEach(res => {
                this.selectedCountries.push(res.label);
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
        this.getAllPlansPostRequest.countries = this.selectedCountries;
        // this.getPlansStates();
        this.getAllPlans();
    }

    /**
     *  To prepare array of selectd country
     *
     * @param {*} item Country selected item
     * @param {*} event Click event
     * @memberof PlansComponent
     */
    public checkedCountryName(item, event) {
        if (event.target.checked) {
            if (this.selectedCountries.indexOf(item.label) === -1) {
                this.selectedCountries.push(item.label);
            }
        } else {
            let index = this.selectedCountries.indexOf(item.label);
            this.selectedCountries.splice(index, 1);
        }
        this.getAllPlansPostRequest.countries = this.selectedCountries;
        this.isAllCountriesSelected();
        // this.getPlansStates();
        this.getAllPlans();
    }

    /**
     * This will close all the popup on ESC button
     *
     * @param {KeyboardEvent} event
     * @memberof PlansComponent
     */
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.hidePopup();
        this.hidePlanDetailsPopup();
    }

    /**
  * API call to get all filter column
  *
  * @memberof PlansComponent
  */
    public getColumnFilter(): void {
        this.columnFilterService.getFavouritePage(FavouriteColumnPageTypeEnum.ADMIN_PLAN).subscribe(response => {
            if (response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
                this.getShowFieldFilterIsApplied();
            } else if (response.status === 'error') {
                this.toaster.errorToast(response.message);
            }
            this.isAllColumnFilterApplied();
            this.getColspanCount();
        });

    }

    /**
      * API call to update filter column
      *
      * @memberof PlansComponent
      */
    public updateColumnFilter(): void {
        this.getShowFieldFilterIsApplied();
        this.columnFilterService.updateFavouritePage(FavouriteColumnPageTypeEnum.ADMIN_PLAN, this.showFieldFilter).subscribe(response => {
            if (response && response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
            }
            this.getColspanCount();
        });
    }

    /**
    *To check is any column toggle filter applied
    *
    * @returns {boolean}
    * @memberof PlansComponent
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
    *To apply column toggle filter
    *
    * @param {boolean} event boolean is column show or hide
    * @param {string} column Column name
    * @memberof PlansComponent
    */
    public columnFilter(event: boolean, column: string) {
        this.showFieldFilter[column] = event;
        this.isAllColumnFilterApplied();
        this.updateColumnFilter();
    }

    /**
    * This will toggle all columns
    *
    * @param {boolean} event
    * @memberof PlansComponent
    */
    public selectAllColumns(event: boolean): void {
        this.showFieldFilter.planName = event;
        this.showFieldFilter.createdOn = event;
        this.showFieldFilter.noOfCompany = event;
        this.showFieldFilter.totalUser = event;
        this.showFieldFilter.totalAmount = event;
        this.showFieldFilter.expiry = event;
        this.showFieldFilter.country = event;
        this.isAllColumnFilterApplied();
        this.updateColumnFilter();
    }

    /**
   *To check all column filter applied true
   *
   * @memberof PlansComponent
   */
    public isAllColumnFilterApplied() {
        this.isAllFieldColumnFilterApplied = Object.keys(this.showFieldFilter).every((k) => this.showFieldFilter[k]);
    }


    /**
    * To get count of colspan
    *
    * @memberof PlansComponent
    */
    public getColspanCount() {
        this.colSpanCount = 0;
        Object.keys(this.showFieldFilter).forEach(item => {
            if (this.showFieldFilter[item]) {
                this.colSpanCount++;
            }
        });
    }


    /**
     * To check local storage filter available
     *
     * @memberof PlansComponent
     */
    public checkLocalStorageFilter(): void {
        let planFilter = localStorage.getItem("planListFilter");
        let planPaginationFilter = localStorage.getItem("planPaginationFilter");
        if (planFilter || planPaginationFilter) {
            let retrievedUserFilterObject = JSON.parse(planFilter);
            let retrievedUserPaginationFilterObject = JSON.parse(planPaginationFilter);
            this.getAllPlansPostRequest = retrievedUserFilterObject;
            this.getAllPlansRequest = retrievedUserPaginationFilterObject;

            if (this.getAllPlansPostRequest && this.getAllPlansPostRequest.countries && this.getAllPlansPostRequest.countries.length > 0) {
                this.selectedCountries = this.getAllPlansPostRequest.countries;
                this.countrySource.map(res => {
                    res.additional = this.selectedCountries.includes(res.label);
                });
                this.isAllCountriesSelected();
            }
            this.getAllPlans();
        } else {
            this.getAllPlansRequest.page = 1;
            this.getAllPlansRequest.sortBy = '';
            this.getAllPlansRequest.sortType = '';
            this.getAllPlans();
        }
    }
}