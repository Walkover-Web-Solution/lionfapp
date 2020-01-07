import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { CommonPaginatedRequest, SubscriberList } from '../../modules/modules/api-modules/subscription';

@Component({
    selector: 'app-licence-key',
    templateUrl: './licence-key.component.html',
    styleUrls: ['./licence-key.component.scss']
})

export class LicenceKeyComponent implements OnInit {
    public items;
    public getAllLicenceKeyRequest: any = {};
    public LicenceKeyRes: SubscriberList = new SubscriberList();
    public activateLicenseKeyRequest: any = {
        uniqueName: ''
    };

    constructor(private licenseService: LicenceService) {

    }

    ngOnInit() {
        this.getAllLicenceKeyRequest.count = 10;
        this.getAllLicenceKeyRequest.page = 1;
        this.getAllLicenceKeyRequest.sort = "asc";
        this.getAllLicenceKey();
    }

    public getAllLicenceKey() {
        this.licenseService.getAllLicenseKeys(this.getAllLicenceKeyRequest).subscribe(res => {
            if (res.status === 'success') {
                this.LicenceKeyRes = res.body;
                this.items = res.body.results;
            }
        });
    }

    public pageChanged(event: any): void {
        this.getAllLicenceKeyRequest.page = event.page;
        this.getAllLicenceKey();
    }

    public sortBy(column) {
        if(column === this.getAllLicenceKeyRequest.sortBy) {
            this.getAllLicenceKeyRequest.sort = (this.getAllLicenceKeyRequest.sort === "asc") ? "desc" : "asc";
        } else {
            this.getAllLicenceKeyRequest.sort = "asc";
        }

        this.getAllLicenceKeyRequest.sortBy = column;
        this.getAllLicenceKey();
    }

    public activateLicenseKey(licenseKey) {
        this.activateLicenseKeyRequest.uniqueName = licenseKey;
        this.licenseService.activateLicenseKey(this.activateLicenseKeyRequest).subscribe(res => {
            if (res.status === 'success') {
                this.getAllLicenceKey();
            } else {

            }
        });
    }
}