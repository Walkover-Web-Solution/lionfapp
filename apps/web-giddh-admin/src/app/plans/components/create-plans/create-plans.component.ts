import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PlansService } from '../../../services/plan.service';
import { NgForm } from '@angular/forms';
import { ToasterService } from '../../../services/toaster.service';
import { IOption } from '../../../theme/ng-select/option.interface';

@Component({
    selector: 'app-create-plans',
    templateUrl: './create-plans.component.html',
    styleUrls: ['./create-plans.component.css']
})

export class CreatePlansComponent implements OnInit {
    /** Form instance */
    @ViewChild('createPlanForm') createPlanForm: NgForm;
    @ViewChild("planName") public planName: ElementRef;
    @Input() public rightToggle: boolean = false;
    @Output() public hidePopup: EventEmitter<boolean> = new EventEmitter(true);

    public countries: any[] = [];
    public currencies: IOption[] = [];
    public isLoading: boolean = false;
    public createPlanRequest: any = {};
    public durationUnits: IOption[] = [{ label: 'YEAR', value: 'YEAR' }, { label: 'MONTH', value: 'MONTH' }, { label: 'WEEK', value: 'WEEK' }, { label: 'DAY', value: 'DAY' }];

    constructor(private plansService: PlansService, private toaster: ToasterService) {
        this.getCountry();
        this.getCurrency();
    }

    /**
     * Initializes the component
     *
     * @memberof CreatePlansComponent
     */
    ngOnInit() {
        this.planName.nativeElement.focus();
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
     * This function is used to get all currencies
     *
     * @memberof CreatePlansComponent
     */
    public getCurrency() {
        this.plansService.getCurrency().subscribe(res => {
            if (res.status === 'success') {
                res.body.forEach(key => {
                    this.currencies.push({ label: key.code, value: key.code });
                });
                this.currencies.sort();
            }
        });
    }

    /**
     * This function is used to create plan
     *
     * @returns
     * @memberof CreatePlansComponent
     */
    public createPlan() {
        if (this.isLoading) {
            return false;
        }

        this.isLoading = true;

        this.plansService.createPlan(this.createPlanRequest).subscribe(res => {
            this.isLoading = false;
            if (res.status === 'success') {
                this.createPlanRequest = {};
                this.toaster.clearAllToaster();
                this.toaster.successToast("Plan has been created successfully.");
                this.closePopup();
            } else {
                this.toaster.clearAllToaster();
                this.toaster.errorToast(res.message);
            }
        });
    }

    /**
     * This function is used to remove whitespaces from left/right
     *
     * @memberof CreatePlansComponent
     */
    public validatePlanName() {
        if (this.createPlanRequest.name) {
            this.createPlanRequest.name = this.createPlanRequest.name.trim();
        }
    }

    /**
     * This function is used to restrict value to min range
     *
     * @memberof CreatePlansComponent
     */
    public validateMinValue() {
        if (this.createPlanRequest.companiesLimit < 1) {
            this.createPlanRequest.companiesLimit = 1;
        }
        if (this.createPlanRequest.transactionLimit < 1) {
            this.createPlanRequest.transactionLimit = 1;
        }
        if (this.createPlanRequest.duration < 1) {
            this.createPlanRequest.duration = 1;
        }
        if (this.createPlanRequest.ratePerExtraTransaction < 0) {
            this.createPlanRequest.ratePerExtraTransaction = 0;
        }
    }

    /**
     * This function is used to emit close popup
     *
     * @memberof CreatePlansComponent
     */
    public closePopup() {
        this.hidePopup.emit();
    }

    /**
     * This will close all the popup on ESC button
     *
     * @param {KeyboardEvent} event
     * @memberof CreatePlansComponent
     */
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.closePopup();
    }
}