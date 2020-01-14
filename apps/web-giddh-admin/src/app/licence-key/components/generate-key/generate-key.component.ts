import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansService } from '../../../services/plan.service';
import { CommonPaginatedRequest } from '../../../modules/modules/api-modules/subscription';
import { NgForm } from '@angular/forms';
import { LicenceService } from '../../../services/licence.service';
import { ToasterService } from '../../../services/toaster.service';
import { IOption } from '../../../theme/ng-select/ng-select';
import { IForceClear } from '../../../theme/ng-virtual-select/sh-select.component';
import { Observable, of as observableOf } from 'rxjs';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';

@Component({
    selector: 'app-generate-key',
    templateUrl: './generate-key.component.html',
    styleUrls: ['./generate-key.component.css']
})

export class GenerateKeyComponent implements OnInit {
    /** Form instance */
    @ViewChild('generateKeysForm') generateKeysForm: NgForm;

    public getAllPlansPostRequest: any = {};
    public getAllPlansRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public allPlans: IOption[] = [];
    public generateLicenseKeysRequest: any = {
        planUniqueName: '',
        noOfKeys: 1
    };
    public generatedKeys: any[] = [];
    public isLoading: boolean = false;
    public selectAllActive: boolean = null;
    public licenseStatistics: any;
    public generatedKeysAvailable: boolean = false;
    public forceClear$: Observable<IForceClear> = observableOf({ status: false });

    constructor(private plansService: PlansService, private licenseService: LicenceService, private generalService: GeneralService, private toaster: ToasterService, private router: Router) {
        this.getLicenseKeyStatistics();
        this.getAllPlans();
    }

    /**
     * Initializing the component
     *
     * @memberof GenerateKeyComponent
     */
    ngOnInit(): void {
        let currentUrl = this.router.url;
        this.generalService.setCurrentPageTitle(currentUrl);
    }

    /**
     * This function is used to get all plans to show in dropdown
     *
     * @memberof GenerateKeyComponent
     */
    public getAllPlans(): void {
        this.getAllPlansRequest.count = 0;
        this.getAllPlansRequest.page = 1;
        this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
        this.getAllPlansRequest.sortType = 'desc';
        this.plansService.getAllPlans(this.getAllPlansRequest, this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                res.body.results.forEach(key => {
                    this.allPlans.push({ label: key.name, value: key.uniqueName });
                });
            } else {
                this.toaster.clearAllToaster();
                this.toaster.errorToast("Something went wrong in getting plans! Please try again.");
            }
        });
    }

    /**
     * This function is used to generate license keys
     *
     * @memberof GenerateKeyComponent
     */
    public generateKeys(): void {
        this.validateLicenseKeys();
        this.isLoading = true;

        this.licenseService.createLicenseKey(this.generateLicenseKeysRequest).subscribe(res => {
            this.isLoading = false;
            if (res.status === 'success') {
                this.generateLicenseKeysRequest.planUniqueName = "";
                this.generateLicenseKeysRequest.comments = "";
                this.generateLicenseKeysRequest.noOfKeys = 1;
                this.forceClear$ = observableOf({ status: true });
                this.generatedKeysAvailable = true;
                this.getLicenseKeyStatistics();
                this.toaster.clearAllToaster();
                this.toaster.successToast("License keys have been generated successfully.");
                this.generatedKeys = res.body;
            } else {
                this.generatedKeysAvailable = false;
                this.toaster.clearAllToaster();
                this.toaster.errorToast(res.message);
                this.generatedKeys = [];
            }
        });
    }

    /**
     * This function is used to check/uncheck particular key
     *
     * @param {*} key
     * @memberof GenerateKeyComponent
     */
    public selectLicenseKey(key): void {
        if (!key.checked) {
            key.checked = true;
        } else {
            key.checked = false;
        }

        this.selectAllActive = null;
    }

    /**
     * This function is used to copy selected keys
     *
     * @returns {(void | boolean)}
     * @memberof GenerateKeyComponent
     */
    public copyKeys(): void | boolean {
        let copiedKeys = '';

        this.generatedKeys.forEach(key => {
            if (key.checked) {
                copiedKeys += key.key + "\n";
            }
        });

        if (!copiedKeys) {
            this.toaster.clearAllToaster();
            this.toaster.warningToast("Please select atleast 1 key to copy!");
            return false;
        }

        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = copiedKeys;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.toaster.clearAllToaster();
        this.toaster.infoToast("License keys have been copied successfully.");
    }

    /**
     * This function is used to check/uncheck all keys
     *
     * @param {*} event
     * @memberof GenerateKeyComponent
     */
    public selectAllKeys(event): void {
        let selectAll = event.target.checked;

        if (selectAll) {
            this.selectAllActive = true;
        } else {
            this.selectAllActive = null;
        }

        this.generatedKeys.forEach(key => {
            key.checked = (selectAll) ? true : null;
        });
    }

    /**
     * This function is used to delete selected keys
     *
     * @memberof GenerateKeyComponent
     */
    public deleteKeys(): void {
        let deleteKeys = [];
        let generatedKeysAvailable = false;

        this.generatedKeys.forEach(key => {
            if (key.checked) {
                deleteKeys.push(key.key);
            }
        });

        if (deleteKeys && deleteKeys.length > 0) {
            this.licenseService.deleteLicenseKeys(deleteKeys).subscribe(res => {
                if (res.status === 'success') {
                    let loop = 0;
                    this.generatedKeys.forEach(key => {
                        let index = deleteKeys.indexOf(key.key);
                        if (index > -1) {
                            if (this.generatedKeys[loop]) {
                                this.generatedKeys[loop].deleted = true;
                            }
                        }

                        if (!this.generatedKeys[loop].deleted) {
                            generatedKeysAvailable = true;
                        }

                        loop++;
                    });

                    this.getLicenseKeyStatistics();
                    this.generatedKeysAvailable = generatedKeysAvailable;
                    this.selectAllActive = null;
                    this.toaster.successToast(res.body);
                } else {
                    this.toaster.warningToast(res.message);
                }
            });
        } else {
            this.toaster.clearAllToaster();
            this.toaster.warningToast("Please select atleast 1 key to delete!");
        }
    }

    /**
     * This function is used to get license key statistics
     *
     * @memberof GenerateKeyComponent
     */
    public getLicenseKeyStatistics() {
        this.licenseService.getLicenseKeyStatistics().subscribe(res => {
            if (res.status === 'success') {
                this.licenseStatistics = res.body;
            } else {
                this.licenseStatistics = { active: 0, expired: 0, total: 0 };
            }
        });
    }

    /**
     * This function is to restrict license keys to min/max range
     *
     * @memberof GenerateKeyComponent
     */
    public validateLicenseKeys() {
        if (this.generateLicenseKeysRequest.noOfKeys) {
            if (this.generateLicenseKeysRequest.noOfKeys < 1) {
                this.generateLicenseKeysRequest.noOfKeys = 1;
            } else if (this.generateLicenseKeysRequest.noOfKeys > 1000) {
                this.generateLicenseKeysRequest.noOfKeys = 1000;
            }
        }
    }
}