import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PlansService } from '../../../services/plan.service';
import { ToasterService } from '../../../services/toaster.service';
import { UpdatePlanRequest } from '../../../models/subscription';

@Component({
    selector: 'app-plan-details',
    templateUrl: './plan-details.component.html',
    styleUrls: ['./plan-details.component.css']
})

export class PlanDetailsComponent implements OnInit {
    @ViewChild('planName') planName: ElementRef;
    @Input() public planUniqueName;
    @Input() public rightToggle: boolean = false;
    @Output() public hidePopup: EventEmitter<boolean> = new EventEmitter(true);

    public isLoading: boolean = false;
    public planDetails: any[] = [];
    public updatePlanRequest: UpdatePlanRequest;

    constructor(private plansService: PlansService, private toaster: ToasterService) {

    }

    ngOnInit() {
        if (this.planUniqueName) {
            this.getPlan();
        } else {
            this.toaster.errorToast("Plan doesn't exists! Please try again.");
            this.closePopup();
        }

        setTimeout(() => {
            this.planName.nativeElement.focus();
        }, 20);
    }

    public closePopup() {
        this.hidePopup.emit();
    }

    public getPlan() {
        this.isLoading = true;

        this.plansService.getPlan(this.planUniqueName).subscribe(res => {
            this.isLoading = false;
            if (res.status === 'success') {
                this.planDetails = res.body;
                this.updatePlanRequest = res.body;
            } else {
                this.toaster.errorToast(res.message);
            }
        });
    }

    public updatePlan(planObject) {
        if (planObject) {
            let planObj = planObject;
            planObj.currency = planObject.currency.code;
            this.updatePlanRequest = planObj;
            this.plansService.updatePlan(this.planUniqueName, this.updatePlanRequest).subscribe(res => {
                this.isLoading = false;
                if (res.status === 'success') {
                    this.planDetails = res.body;
                    this.toaster.successToast('Plan updated successfully');
                    this.closePopup();
                } else {
                    this.toaster.errorToast(res.message);
                }
            });
        }
    }
}