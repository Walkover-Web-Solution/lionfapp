import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { SubscriberList, PAGINATION_COUNT } from '../../modules/modules/api-modules/subscription';
import { BsModalService, BsModalRef, BsDropdownDirective } from 'ngx-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';
import { FavouriteColumnPageTypeEnum } from '../../actions/general/general.const';
import { ColumnFilterService } from '../../services/column-filter.service';
import { ToasterService } from '../../services/toaster.service';
import { cloneDeep } from '../../lodash-optimized';
import { LicenseFieldFilterColumnNames } from '../../models/company';

@Component({
    selector: 'app-licence-key',
    templateUrl: './licence-key.component.html',
    styleUrls: ['./licence-key.component.scss']
})

export class LicenceKeyComponent implements OnInit {

    @ViewChild('filterDropDownList') public filterDropDownList: BsDropdownDirective;

    public items;
    public getAllLicenceKeyRequest: any = {};
    public LicenceKeyRes: SubscriberList = new SubscriberList();
    public modalRef: BsModalRef;
    public subscriptionId: any = '';
    public colSpanCount: number;

    public showFieldFilter: LicenseFieldFilterColumnNames = new LicenseFieldFilterColumnNames();
    public isFieldColumnFilterApplied: boolean;
    public isAllFieldColumnFilterApplied: boolean;
    public showClearFilter: boolean = false;


    constructor(private licenseService: LicenceService, private modalService: BsModalService, private generalService: GeneralService, private router: Router, private columnFilterService: ColumnFilterService, private toaster: ToasterService) {

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
        /** To get dynamic column filter  */
        this.getColumnFilter();
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
     *To hide column filter pop up
     *
     * @memberof LicenceKeyComponent
     */
    public hideListItems() {
        this.filterDropDownList.hide();
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

    /**
    * API call to get all filter column
    *
    * @memberof LicenceKeyComponent
    */
    public getColumnFilter(): void {
        this.columnFilterService.getFavouritePage(FavouriteColumnPageTypeEnum.ADMIN_LICENSE).subscribe(response => {
            if (response && response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
                this.getShowFieldFilterIsApplied();
            } else if (response.status === 'error') {
                this.toaster.errorToast(response.message);
            }
            this.getColspanCount();
        });

    }

    /**
    * This function is used to reset filters
    *
    * @memberof LicenceKeyComponent
    */
    public resetFilters() {
        this.getAllLicenceKeyRequest.page = 1;
        this.selectAllColumns(true);
        this.getAllLicenceKey();
    }


    /**
     * API call to update filter column
     *
     * @memberof LicenceKeyComponent
     */
    public updateColumnFilter(): void {
        this.getShowFieldFilterIsApplied();
        this.columnFilterService.updateFavouritePage(FavouriteColumnPageTypeEnum.ADMIN_LICENSE, this.showFieldFilter).subscribe(response => {
            if (response.status === 'success') {
                if (response.body && response.body.favourite) {
                    Object.assign(this.showFieldFilter, response.body.favourite);
                    this.showFieldFilter = cloneDeep(response.body.favourite);
                }
            }
            this.getColspanCount();
            this.isAllColumnFilterApplied();
        });
    }

    /**
    *To check is any column toggle filter applied
    *
    * @returns {boolean}
    * @memberof LicenceKeyComponent
    */
    public getShowFieldFilterIsApplied(): boolean {
        this.isFieldColumnFilterApplied = false;
        Object.keys(this.showFieldFilter).forEach(key => {
            if (!this.showFieldFilter[key]) {
                this.isFieldColumnFilterApplied = true;
                this.showClearFilter = true
            }
        });
        return this.isFieldColumnFilterApplied;
    }

    /**
     * To apply column toggle filter
     *
     * @param {boolean} event boolean is column show or hide
     * @param {string} column Column name
     * @memberof LicenceKeyComponent
     */
    public columnFilter(event: boolean, column: string) {
        this.showFieldFilter[column] = event;
        this.isAllColumnFilterApplied()
        this.updateColumnFilter();
    }

    /**
    * This will toggle all columns
    *
    * @param {boolean} event
    * @memberof LicenceKeyComponent
    */
    public selectAllColumns(event: boolean): void {
        this.showFieldFilter.userName = event;
        this.showFieldFilter.subscribedOn = event;
        this.showFieldFilter.subscriptionId = event;
        this.showFieldFilter.planName = event;
        this.showFieldFilter.noOfCompany = event;

        this.showFieldFilter.balance = event;
        this.showFieldFilter.transactionLimit = event;
        this.showFieldFilter.licenseKey = event;
        this.showFieldFilter.status = event;
        this.showFieldFilter.expiry = event;
        this.showFieldFilter.totalAmount = event;
        this.showFieldFilter.comments = event;
        this.isAllColumnFilterApplied()
        this.updateColumnFilter();
    }

    /**
    *To check all column filter applied true
    *
    * @memberof LicenceKeyComponent
    */
    public isAllColumnFilterApplied() {
        this.isAllFieldColumnFilterApplied = Object.keys(this.showFieldFilter).every((k) => this.showFieldFilter[k]);
    }


    /**
     * To get count of colspan
     *
     * @memberof LicenceKeyComponent
     */
    public getColspanCount() {
        this.colSpanCount = 0;
        Object.keys(this.showFieldFilter).forEach(item => {
            if (this.showFieldFilter[item]) {
                this.colSpanCount++;
            }
        });
    }
}