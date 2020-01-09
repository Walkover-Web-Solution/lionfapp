import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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

    ngOnInit() {

    }

    public closePopup() {
        this.hidePopup.emit();
    }

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

    public createPlan() {
        if (this.isLoading) {
            return false;
        }

        this.isLoading = true;

        this.plansService.createPlan(this.createPlanRequest).subscribe(res => {
            if (res.status === 'success') {
                this.toaster.successToast("Plan has been created successfully.");
                this.closePopup();
            } else {
                this.toaster.errorToast(res.message);
            }
        });
    }
}