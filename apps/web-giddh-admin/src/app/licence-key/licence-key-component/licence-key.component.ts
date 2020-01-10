import { Component, OnInit, TemplateRef } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { SubscriberList } from '../../modules/modules/api-modules/subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-licence-key',
    templateUrl: './licence-key.component.html',
    styleUrls: ['./licence-key.component.scss']
})

export class LicenceKeyComponent implements OnInit {
    public items;
    public getAllLicenceKeyRequest: any = {};
    public LicenceKeyRes: SubscriberList = new SubscriberList();
    public modalRef: BsModalRef;
    public subscriptionId: any = '';

    constructor(private licenseService: LicenceService, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.getAllLicenceKeyRequest.count = 50;
        this.getAllLicenceKeyRequest.page = 1;
        this.getAllLicenceKeyRequest.sort = "asc";
        this.getAllLicenceKey();
    }

    public getAllLicenceKey() {
        this.licenseService.getAllLicenseKeys(this.getAllLicenceKeyRequest).subscribe(res => {
            if (res.status === 'success') {
                this.LicenceKeyRes = res.body;
                this.items = [];

                res.body.results.forEach(key => {
                    key.subOn = key.subOn.replace(/-/g, "/");
                    key.subExpiry = key.subExpiry.replace(/-/g, "/");
                    this.items.push(key);
                });
            }
        });
    }

    public pageChanged(event: any): void {
        this.getAllLicenceKeyRequest.page = event.page;
        this.getAllLicenceKey();
    }

    public sortBy(column) {
        if (column === this.getAllLicenceKeyRequest.sortBy) {
            this.getAllLicenceKeyRequest.sort = (this.getAllLicenceKeyRequest.sort === "asc") ? "desc" : "asc";
        } else {
            this.getAllLicenceKeyRequest.sort = "asc";
        }

        this.getAllLicenceKeyRequest.sortBy = column;
        this.getAllLicenceKey();
    }

    public openSubscriptionModal(template: TemplateRef<any>, subscriptionId) {
        this.subscriptionId = subscriptionId;
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
        );
    }
}