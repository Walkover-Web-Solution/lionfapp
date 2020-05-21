import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonPaginatedRequest, PAGINATION_COUNT, CompanyAdvanceSearchRequestSubscriptions } from '../../../modules/modules/api-modules/subscription';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { ToasterService } from '../../../services/toaster.service';
import * as moment from 'moment/moment';
import { GIDDH_DATE_FORMAT } from '../../../shared/defalutformatter/defaultDateFormat';
import { digitsOnly } from '../../../shared/helper/customValidationhelper';
import { IOption } from '../../../theme/ng-select/ng-select';
import { ShSelectComponent } from '../../../theme/ng-virtual-select/sh-select.component';

@Component({
    selector: 'app-company-advance-search',
    templateUrl: './company-advance-search.component.html',
    styleUrls: ['./company-advance-search.component.scss']
})

export class CompanyAdvanceSearchComponent implements OnInit, AfterViewInit {
    public advanceSearchForm: FormGroup;
    @Input() public rightToggle: boolean = false;
    @Input() public searchedAdvancedRequestModelByAdvanceSearch: CompanyAdvanceSearchRequestSubscriptions = {
        expiryFilter: {
            from: '',
            to: ''
        },
        subscribeOn: {
            from: '',
            to: ''
        },
        remainingTxnOpn: '',
        remainingTxn: '',
        transactionLimitOperation: '',
        transactionLimit: '',
        additionalChargesOperation: '',
        additionalCharges: ''
    };
    @Output() public hidePopup: EventEmitter<boolean> = new EventEmitter(true);
    @Output() public advanceSearchRequestEmitter: EventEmitter<CompanyAdvanceSearchRequestSubscriptions> = new EventEmitter();

    public advanceSearchFilter: CommonPaginatedRequest = new CommonPaginatedRequest();
    public advanceSearchRequest: CompanyAdvanceSearchRequestSubscriptions = {
        expiryFilter: {
            from: '',
            to: ''
        },
        subscribeOn: {
            from: '',
            to: ''
        },
        remainingTxnOpn: '',
        remainingTxn: '',
        transactionLimitOperation: '',
        transactionLimit: '',
        additionalChargesOperation: '',
        additionalCharges: ''
    };
    public lessGreaterFilters: IOption[] = [{ label: 'Greater than', value: 'GREATER_THAN' }, { label: 'Less than', value: 'LESS_THAN' }, { label: 'Greater than equals to', value: 'GREATER_THAN_OR_EQUALS' }, { label: 'Less than equals to', value: 'LESS_THAN_OR_EQUALS' }];
    public defaultLoad: boolean = true;

    constructor(private fb: FormBuilder, private store: Store<AppState>, private adminActions: AdminActions, private toasty: ToasterService) { }

    ngOnInit() {
        this.advanceSearchFilter.count = PAGINATION_COUNT;
        this.advanceSearchFilter.page = 1;
        this.setAdvanceSearch();
    }

    public ngAfterViewInit() {
        setTimeout(() => {
            this.defaultLoad = false;
        }, 1000);
    }

    public advanceSearch() {
        let dataToSend = _.cloneDeep(this.advanceSearchForm.value);

        if(dataToSend.expiryFilter.from && (!this.searchedAdvancedRequestModelByAdvanceSearch || !this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter || dataToSend.expiryFilter.from != this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.from)) {
            dataToSend.expiryFilter.from =  moment(dataToSend.expiryFilter.from).format(GIDDH_DATE_FORMAT);
        }

        if(dataToSend.expiryFilter.to && (!this.searchedAdvancedRequestModelByAdvanceSearch || !this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter || dataToSend.expiryFilter.to != this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.to)) {
            dataToSend.expiryFilter.to =  moment(dataToSend.expiryFilter.to).format(GIDDH_DATE_FORMAT);
        }

        if(dataToSend.subscribeOn.from && (!this.searchedAdvancedRequestModelByAdvanceSearch || !this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn || dataToSend.subscribeOn.from != this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.from)) {
            dataToSend.subscribeOn.from =  moment(dataToSend.subscribeOn.from).format(GIDDH_DATE_FORMAT);
        }

        if(dataToSend.subscribeOn.to && (!this.searchedAdvancedRequestModelByAdvanceSearch || !this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn || dataToSend.subscribeOn.to != this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.to)) {
            dataToSend.subscribeOn.to =  moment(dataToSend.subscribeOn.to).format(GIDDH_DATE_FORMAT);
        }

        this.advanceSearchRequestEmitter.emit(dataToSend);
    }

    public setAdvanceSearch() {
        this.advanceSearchForm = this.fb.group({
            expiryFilter: this.fb.group({
                from: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.from) ? moment(this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.from, GIDDH_DATE_FORMAT).format(GIDDH_DATE_FORMAT) : ''],
                to: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.to) ? moment(this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.to, GIDDH_DATE_FORMAT).format(GIDDH_DATE_FORMAT) : '']
            }),
            subscribeOn: this.fb.group({
                from: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.from) ? moment(this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.from, GIDDH_DATE_FORMAT).format(GIDDH_DATE_FORMAT) : ''],
                to: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.to) ? moment(this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.to, GIDDH_DATE_FORMAT).format(GIDDH_DATE_FORMAT) : '']
            }),
            remainingTxnOpn: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.remainingTxnOpn : ''],
            remainingTxn: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.remainingTxn : '', Validators.compose([digitsOnly])],
            transactionLimitOperation: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.transactionLimitOperation : ''],
            transactionLimit: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.transactionLimit : '', Validators.compose([digitsOnly])],
            additionalChargesOperation: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.additionalChargesOperation : ''],
            additionalCharges: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.additionalCharges : '', Validators.compose([digitsOnly])]
        });
    }

    public closePopup() {
        this.hidePopup.emit();
    }
}
