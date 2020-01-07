import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PlansService } from '../../../services/plan.service';
import { NgForm } from '@angular/forms';
import { ToasterService } from '../../../services/toaster.service';

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
    public isLoading: boolean = false;
    public createPlanRequest: any = {};

    constructor(private plansService: PlansService, private toaster: ToasterService) {
        this.getCountry();
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
                    this.countries.push(key.countryName);
                });
                this.countries.sort();
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
                this.toaster.errorToast("Something went wrong! Please try again.");
            }
        });
    }
}