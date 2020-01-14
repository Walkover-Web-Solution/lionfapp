import { Component, OnInit, TemplateRef } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { SubscriberList } from '../../modules/modules/api-modules/subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';

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

    constructor(private licenseService: LicenceService, private modalService: BsModalService, private router: Router, private generalService: GeneralService) {

    }

    /**
     * Initializes the component
     *
     * @memberof LicenceKeyComponent
     */
    ngOnInit() {
        let currentUrl = this.router.url;
        this.generalService.setCurrentPageTitle(currentUrl);
        this.getAllLicenceKeyRequest.count = 50;
        this.getAllLicenceKeyRequest.page = 1;
        this.getAllLicenceKey();
    }

    /**
     * This function is used to get all license keys
     *
     * @memberof LicenceKeyComponent
     */
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

    /**
     * This function is used to change page
     *
     * @param {*} event
     * @memberof LicenceKeyComponent
     */
    public pageChanged(event: any): void {
        this.getAllLicenceKeyRequest.page = event.page;
        this.getAllLicenceKey();
    }

    /**
     * This function is used to apply sorting on columns
     *
     * @param {*} column
     * @memberof LicenceKeyComponent
     */
    public sortBy(column) {
        if (column === this.getAllLicenceKeyRequest.sortBy) {
            this.getAllLicenceKeyRequest.sort = (this.getAllLicenceKeyRequest.sort === "asc") ? "desc" : "asc";
        } else {
            this.getAllLicenceKeyRequest.sort = "asc";
        }

        this.LicenceKeyRes.totalItems = 0;
        this.getAllLicenceKeyRequest.page = 1;
        this.getAllLicenceKeyRequest.sortBy = column;
        this.getAllLicenceKey();
    }

    /**
     * This function is used to open subscription modal
     *
     * @param {TemplateRef<any>} template
     * @param {*} subscriptionId
     * @memberof LicenceKeyComponent
     */
    public openSubscriptionModal(template: TemplateRef<any>, subscriptionId) {
        this.subscriptionId = subscriptionId;
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
        );
    }
}