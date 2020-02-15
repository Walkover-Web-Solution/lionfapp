import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PlansService } from '../../services/plan.service';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { ToasterService } from '../../services/toaster.service';
import { AuthenticationService } from '../../services/authentication.service';
import { IOption } from '../../theme/ng-select/ng-select';
import { PAGINATION_COUNT } from '../../modules/modules/api-modules/subscription';



@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})

export class PlansComponent implements OnInit {


    @ViewChild('planNameField') public planNameField;
    @Input() public showTaxPopup: boolean = false;
    @Input() public showTaxPopups: boolean = false;

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
        this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
        this.getAllPlansRequest.sortType = 'desc';
        this.getPlansStats();
        this.getAllPlans();
        this.getOnboardCountries();
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
    public handleInputFocus(): void {
      this.showTaxPopup = true;
    }

    public handleInputFocused(): void {
      this.showTaxPopups = true;
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
        this.getAllPlansPostRequest.createdAtFrom = '';
        this.getAllPlansPostRequest.createdAtTo = '';
        this.getAllPlansPostRequest.countries = [];
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
        this.plansService.getPlansStats().subscribe(res => {
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
                        this.countrySource.push({ label: key.countryName, value: key.alpha2CountryCode });
                    });
                }
            } else {
                this.toaster.clearAllToaster();
                this.toaster.errorToast(res.message);
            }
        });
    }

    public checkedCountryName(item, event) {
        if (event.target.checked) {
            if (this.selectedCountries.indexOf(item.name) === -1) {
                this.selectedCountries.push(item.label);
            }
        } else {
            let index = this.selectedCountries.indexOf(item.name);
            this.selectedCountries.splice(index, 1);
        }
        this.getAllPlansPostRequest.countries = this.selectedCountries;
         this.getAllPlans();
    }
}