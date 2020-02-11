import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansService } from '../../services/plan.service';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import {FormControl} from '@angular/forms';



@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})

export class PlansComponent implements OnInit {

  toppings = new FormControl();
  public countries: any[] = [];

    @ViewChild('planNameField') public planNameField;

    public plansData: any;
    public plansDataResults: any;
    public getAllPlansRequest: any = {};
    public getAllPlansPostRequest: any = {};
    public togglePanelBool: boolean;
    public togglePlanDetailsPanelBool: boolean;
    public selectedPlan: any = '';
    public inlineSearch: any = '';
    public timeout: any;
    public bsValue: any = '';
    public defaultLoad: boolean = true;
    public planStats: any = {};

    constructor(private plansService: PlansService, private generalService: GeneralService) {
      this.getCountry();
    }



    /**
     * This function is used to get all allowed onboarding countries
     *
     * @memberof CreatePlansComponent
     */
    public getCountry() {
      this.plansService.getCountry().subscribe(res => {
          if (res.status === 'success') {
              res.body.forEach(key => {
                  this.countries.push({ label: key.countryName, value: key.countryName });
              });
              this.countries.sort();
          }
      });
  }

    /**
     * Initializes the component
     *
     * @memberof PlansComponent
     */
    ngOnInit() {
        this.generalService.setCurrentPageTitle("Plans");
        this.getAllPlansRequest.count = 50;
        this.getAllPlansRequest.page = 1;
        this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
        this.getAllPlansRequest.sortType = 'desc';
        this.getPlansStats();
        this.getAllPlans();
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
}