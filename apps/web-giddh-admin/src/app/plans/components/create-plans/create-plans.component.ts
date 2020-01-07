import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlansService } from '../../../services/plan.service';

@Component({
    selector: 'app-create-plans',
    templateUrl: './create-plans.component.html',
    styleUrls: ['./create-plans.component.css']
})

export class CreatePlansComponent implements OnInit {
    @Input() public rightToggle: boolean = false;
    @Output() public hidePopup: EventEmitter<boolean> = new EventEmitter(true);
    
    constructor(private plansService: PlansService) {

    }

    ngOnInit() {

    }

    closePopup() {
        this.hidePopup.emit();
    }
}