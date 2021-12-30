import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IOption } from '../../../theme/ng-select/ng-select';
import { SubscriptionService } from '../../../services/subscription.service';
import { ToasterService } from '../../../services/toaster.service';
import { PlansService } from '../../../services/plan.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
    selector: 'app-assign-plan',
    templateUrl: './assign-plan.component.html',
    styleUrls: ['./assign-plan.component.scss']
})

export class AssignPlanComponent implements OnInit {
    @Output() public hideAssignPlanPopup: EventEmitter<boolean> = new EventEmitter(true);
    public isLoading: boolean = false;
    public countries: IOption[] = [];
    public assignPlanRequest: any = {};
    public plans: IOption[] = [];
    @ViewChild("emailField") public emailField: ElementRef;

    constructor(private subscriptionService: SubscriptionService, private toasty: ToasterService, private plansService: PlansService, private authenticationService: AuthenticationService) {
        this.getCountry();
    }

    /**
     * Initializes the component
     *
     * @memberof AssignPlanComponent
     */
    ngOnInit(): void {
        this.emailField.nativeElement.focus();
    }

    /**
     * This will emit the close popup event
     *
     * @memberof AssignPlanComponent
     */
    public closePopup() {
        this.hideAssignPlanPopup.emit();
    }

    /**
     * This will get the list of onboarding countries
     *
     * @memberof AssignPlanComponent
     */
    public getCountry() {
        this.plansService.getCountry().subscribe(res => {
            if (res.status === 'success') {
                res.body.forEach(key => {
                    this.countries.push({ label: key.countryName, value: key.alpha2CountryCode });
                });
                this.countries.sort();
            }
        });
    }

    /**
     * This will call function to get plans based on selected country
     *
     * @param {IOption} event
     * @memberof AssignPlanComponent
     */
    public selectCountry(event: IOption) {
        if (event) {
            this.getPlansUsingCountry(event.value);
        }
    }

    /**
     * This will get plans based on country code
     *
     * @param {*} countryCode
     * @memberof AssignPlanComponent
     */
    public getPlansUsingCountry(countryCode) {
        this.authenticationService.getAllPlanUsingCountry(countryCode).subscribe(res => {
            if (res.status === 'success') {
                if (res.body && res.body.results) {
                    this.plans = [];
                    res.body.results.forEach(key => {
                        this.plans.push({ label: key.name, value: key.uniqueName });
                    });
                }
            } else {
                this.toasty.clearAllToaster();
                this.toasty.errorToast(res.message);
            }
        });
    }

    /**
     * This will assign the plan for user
     *
     * @memberof AssignPlanComponent
     */
    public assignPlan(): void {
        if(!this.isLoading) {
            this.isLoading = true;
            this.subscriptionService.assignPlan(this.assignPlanRequest).subscribe(res => {
                this.isLoading = false;

                if (res.status === 'success') {
                    this.toasty.successToast("Plan has been assigned successfully.");
                    this.closePopup();
                } else {
                    this.toasty.errorToast(res.message);
                }
            });
        }
    }
}