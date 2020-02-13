import { Component, OnInit, TemplateRef } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { SubscriberList, PAGINATION_COUNT } from '../../modules/modules/api-modules/subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

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

    constructor(private licenseService: LicenceService, private modalService: BsModalService, private generalService: GeneralService, private router: Router) {

    }

    /**
     * Initializes the component
     *
     * @memberof LicenceKeyComponent
     */
    ngOnInit() {
        this.generalService.setCurrentPageTitle("License Keys");
        this.getAllLicenceKeyRequest.count = PAGINATION_COUNT;
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
                    if (key.subOn) {
                        key.subOn = key.subOn.replace(/-/g, "/");
                    } else {
                        key.subOn = '';
                    }
                    if (key.subExpiry) {
                        key.subExpiry = key.subExpiry.replace(/-/g, "/");
                    } else {
                        key.subExpiry = '';
                    }

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
    public openEditSubscription(subscriptionId) {
        this.subscriptionId = subscriptionId;
        this.router.navigate([`admin/subscription/edit/${subscriptionId}`]);
    }
}