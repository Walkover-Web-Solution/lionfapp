import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansService } from '../../services/plan.service';
import { CommonPaginatedRequest, SubscriberList } from '../../modules/modules/api-modules/subscription';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})

export class PlansComponent implements OnInit {

    @ViewChild('planNameField') public planNameField;
    
    public PlansData = [];
    public getAllPlansRequest: any = {};
    public getAllPlansPostRequest: any = {};
    public allPlansRes: SubscriberList = new SubscriberList();
    public togglePanelBool: boolean;
    public inlineSearch: any = '';
    public timeout: any;


    constructor(private plansService: PlansService) {

    }
    
    ngOnInit() {
        this.getAllPlansRequest.count = 10;
        this.getAllPlansRequest.page = 1;
        this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
        this.getAllPlansRequest.sortType = 'desc';
        this.getAllPlans();
    }

    public getAllPlans() {
        this.plansService.getAllPlans(this.getAllPlansRequest, this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.allPlansRes = res.body;
                this.PlansData = res.body.results;
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
        if(column === this.getAllPlansRequest.sortBy) {
            this.getAllPlansRequest.sortType = (this.getAllPlansRequest.sortType === "asc") ? "desc" : "asc";
        } else {
            this.getAllPlansRequest.sortType = "asc";
        }

        this.getAllPlansRequest.sortBy = column;
        this.getAllPlans();
    }

    public onChangeFilterDate(dates: any) {
        if (dates !== null) {
            this.getAllPlansPostRequest.createdAt_from = moment(dates[0]).format("DD-MM-YYYY");
            this.getAllPlansPostRequest.createdAt_to = moment(dates[0]).format("DD-MM-YYYY");
            this.getAllPlans();
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
}