import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansService } from '../../services/plan.service';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';


@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})

export class PlansComponent implements OnInit {

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

    constructor(private plansService: PlansService, private router: Router, private generalService: GeneralService) {

    }

    ngOnInit() {
        let currentUrl = this.router.url;
        this.generalService.setCurrentPageTitle(currentUrl);
        this.getAllPlansRequest.count = 50;
        this.getAllPlansRequest.page = 1;
        this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
        this.getAllPlansRequest.sortType = 'desc';
        this.getAllPlans();
    }

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

    public pageChanged(event: any): void {
        this.getAllPlansRequest.page = event.page;
        this.getAllPlans();

    }

    public togglePanel() {
        if (this.togglePanelBool) {
            this.togglePanelBool = false;
        } else {
            this.togglePanelBool = true;
        }
    }

    public sortBy(column) {
        if (column === this.getAllPlansRequest.sortBy) {
            this.getAllPlansRequest.sortType = (this.getAllPlansRequest.sortType === "asc") ? "desc" : "asc";
        } else {
            this.getAllPlansRequest.sortType = "asc";
        }

        this.getAllPlansRequest.sortBy = column;
        this.getAllPlans();
    }

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

    public focusOnColumnSearch(inlineSearch) {
        this.inlineSearch = inlineSearch;

        setTimeout(() => {
            if (this.inlineSearch === 'planName') {
                this.planNameField.nativeElement.focus();
            }
        }, 200);
    }

    public columnSearch(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.getAllPlansRequest.page = 1;
            this.getAllPlans();
        }, 700);
    }

    public hidePopup() {
        this.togglePanelBool = false;
        this.getAllPlansRequest.page = 1;
        this.getAllPlans();
    }

    public hidePlanDetailsPopup() {
        this.selectedPlan = '';
        this.togglePlanDetailsPanelBool = false;
    }

    public resetFilters() {
        this.bsValue = null;
        this.getAllPlansPostRequest.createdAtFrom = '';
        this.getAllPlansPostRequest.createdAtTo = '';
        this.getAllPlans();
    }

    public showPlanDetails(uniqueName) {
        this.selectedPlan = uniqueName;
        this.togglePlanDetailsPanelBool = true;
    }
}