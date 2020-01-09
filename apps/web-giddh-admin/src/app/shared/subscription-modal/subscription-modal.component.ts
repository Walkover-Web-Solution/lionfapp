import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-subscription-modal',
    templateUrl: './subscription-modal.component.html',
    styleUrls: ['./subscription-modal.component.scss']
})

export class SubscriptionModalComponent implements OnInit {
    @Input() public subscriptionId;

    items = [
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
        { company: 'walkover', subscribeon: '04/10/2019', subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019' },
    ];

    public modalRef: BsModalRef;
    constructor(private modalService: BsModalService) { }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit() {
        console.log(this.subscriptionId);
    }

    hideModal() {
        this.modalRef.hide();
    }
}