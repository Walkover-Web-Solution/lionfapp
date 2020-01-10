import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-editPlan-modal',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanModalComponent implements OnInit {
  items = [
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
    {company: 'walkover', subscribeon: '04/10/2019' ,subcription: 1, Balance: 1000, Tranaction: 10000, total: 4000, Additional: 100, Additional1: 2000, rate: 0.1, status: 'Active', expiry: '04/10/2019'},
  ];
  
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
  }
}