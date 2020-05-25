import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { PlansService } from '../../services/plan.service';
import * as moment from 'moment/moment';
import { GeneralService } from '../../services/general.service';
import { ToasterService } from '../../services/toaster.service';
import { AuthenticationService } from '../../services/authentication.service';
import { IOption } from '../../theme/ng-select/ng-select';
import { PAGINATION_COUNT } from '../../modules/modules/api-modules/subscription';
import { BsDropdownDirective } from 'ngx-bootstrap';


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

    public plansData: any;
    public plansDataResults: any;
    public getAllPlansRequest: any = {};
    public getAllPlansPostRequest: any = {

    };
    public togglePanelBool: boolean;
    public togglePlanDetailsPanelBool: boolean;
    public selectedPlan: any = '';
    public inlineSearch: any = '';
    public timeout: any;
    public bsValue: any = '';
    public defaultLoad: boolean = true;
    public planStats: any = {};
    public countrySource: IOption[] = [];
    public selectedCountries: string[] = []
    public isAllCountrySelected: boolean = false;
    public PAGINATION_COUNT:number = PAGINATION_COUNT;

    constructor(private plansService: PlansService, private generalService: GeneralService, private toaster: ToasterService, private authenticationService: AuthenticationService) {
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
        this.getAllPlansRequest.page = 1;
        this.getAllPlansRequest.sortBy = '';
        this.getAllPlansRequest.sortType = '';
        this.getPlansStats();
        this.getAllPlans();
        this.getOnboardCountries();
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
            this.getPlansStats();
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
     * This function is used to get plans by search
     *
     * @memberof PlansComponent
     */
    public columnSearch(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.getAllPlansRequest.page = 1;
            this.getPlansStats();
            this.getAllPlans();
        }, 700);
    }

    /**
     * This function is used to hide aside popup
     *
     * @memberof PlansComponent
     */
    public hidePopup() {
        this.togglePanelBool = false;
        this.getAllPlansRequest.page = 1;
        this.getPlansStats();
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
        this.getPlansStats();
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
        this.getPlansStats();
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
    public getPlansStats() {
        this.plansService.getPlansStats(this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.planStats = res.body;
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
        this.getPlansStats();
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
        this.getPlansStats();
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
}