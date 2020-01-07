import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansService } from '../../../services/plan.service';
import { CommonPaginatedRequest } from '../../../modules/modules/api-modules/subscription';
import { NgForm } from '@angular/forms';
import { LicenceService } from '../../../services/licence.service';
import { ToasterService } from '../../../services/toaster.service';

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
    public allPlans: any[] = [];
    public generateLicenseKeysRequest: any = {
        planUniqueName: '',
        noOfKeys: 1
    };
    public selectedPlan: any;
    public generatedKeys: any[] = [];
    public isLoading: boolean = false;
    public selectAllActive: boolean = false;

    constructor(private plansService: PlansService, private licenseService: LicenceService, private toaster: ToasterService) {
        this.getAllPlans();
    }

    /**
     * Initializing the component
     *
     * @memberof GenerateKeyComponent
     */
    ngOnInit(): void {

    }

    /**
     * This function is used to get all plans to show in dropdown
     *
     * @memberof GenerateKeyComponent
     */
    public getAllPlans(): void {
        this.getAllPlansRequest.count = 0;
        this.getAllPlansRequest.page = 1;
        this.plansService.getAllPlans(this.getAllPlansRequest, this.getAllPlansPostRequest).subscribe(res => {
            if (res.status === 'success') {
                this.allPlans = res.body.results;
            } else {
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
        if (this.selectedPlan) {
            this.generateLicenseKeysRequest.planUniqueName = this.selectedPlan.planUniqueName;
        }

        this.isLoading = true;

        this.licenseService.createLicenseKey(this.generateLicenseKeysRequest).subscribe(res => {
            this.isLoading = false;
            if (res.status === 'success') {
                this.generateLicenseKeysRequest.planUniqueName = "";
                this.generateLicenseKeysRequest.noOfKeys = 1;
                this.selectedPlan = [];

                this.toaster.successToast("License keys have been generated successfully.");
                this.generatedKeys = res.body;
            } else {
                this.toaster.errorToast("Something went wrong! Please try again.");
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

    }
}