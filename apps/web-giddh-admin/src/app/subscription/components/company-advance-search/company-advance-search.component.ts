import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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

export class CompanyAdvanceSearchComponent implements OnInit {
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
        remainingTxnOption: '',
        remainingTxn: '',
        transactionLimitOption: '',
        transactionLimitTxn: '',
        additionalChargesOption: '',
        additionalChargesTxn: '',
        lastEntryLogDateOption: '',
        lastEntryLogDate: '',
        lastLoginDateOption: '',
        lastLoginDate: ''
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
        remainingTxnOption: '',
        remainingTxn: '',
        transactionLimitOption: '',
        transactionLimitTxn: '',
        additionalChargesOption: '',
        additionalChargesTxn: '',
        lastEntryLogDateOption: '',
        lastEntryLogDate: '',
        lastLoginDateOption: '',
        lastLoginDate: ''
    };
    public lessGreaterFilters: IOption[] = [{ label: 'Greater than', value: 'GREATER_THAN' }, { label: 'Less than', value: 'LESS_THAN' }, { label: 'Greater than equals to', value: 'GREATER_THAN_OR_EQUALS' }, { label: 'Less than equals to', value: 'LESS_THAN_OR_EQUALS' }];
    public defaultLoad: boolean = true;

    constructor(private fb: FormBuilder, private store: Store<AppState>, private adminActions: AdminActions, private toasty: ToasterService) { }

    ngOnInit() {
        this.advanceSearchFilter.count = PAGINATION_COUNT;
        this.advanceSearchFilter.page = 1;
        this.setAdvanceSearch();
    }

    public advanceSearch() {
        let dataToSend = _.cloneDeep(this.advanceSearchForm.value);
        dataToSend.expiryFilter.from = dataToSend.expiryFilter.from ? moment(dataToSend.expiryFilter.from).format(GIDDH_DATE_FORMAT) : '';
        dataToSend.expiryFilter.to = dataToSend.expiryFilter.to ? moment(dataToSend.expiryFilter.to).format(GIDDH_DATE_FORMAT) : '';
        dataToSend.subscribeOn.from = dataToSend.subscribeOn.from ? moment(dataToSend.subscribeOn.from).format(GIDDH_DATE_FORMAT) : '';
        dataToSend.subscribeOn.to = dataToSend.subscribeOn.to ? moment(dataToSend.subscribeOn.to).format(GIDDH_DATE_FORMAT) : '';
        dataToSend.lastEntryLogDate = dataToSend.lastEntryLogDate ? moment(dataToSend.lastEntryLogDate).format(GIDDH_DATE_FORMAT) : '';
        dataToSend.lastLoginDate = dataToSend.lastLoginDate ? moment(dataToSend.lastLoginDate).format(GIDDH_DATE_FORMAT) : '';

        this.advanceSearchRequestEmitter.emit(dataToSend);
        //this.getAdvancedSearchedSubscriptions(dataToSend)
    }

    public getAdvancedSearchedSubscriptions(advanceSearchRequest) {
        this.store.dispatch(this.adminActions.getSubscriptionAdvancedSearch(advanceSearchRequest, this.advanceSearchFilter));
    }

    public setAdvanceSearch() {
        this.advanceSearchForm = this.fb.group({
            expiryFilter: this.fb.group({
                from: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter) ? this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.from: ''],
                to: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter) ? this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.to: '']
            }),
            subscribeOn: this.fb.group({
                from: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn) ? this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.from: ''],
                to: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn) ? this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.to: '']
            }),
            remainingTxnOption: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.remainingTxnOption : ''],
            remainingTxn: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.remainingTxn : '', Validators.compose([digitsOnly])],
            transactionLimitOption: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.transactionLimitOption : ''],
            transactionLimitTxn: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.transactionLimitTxn : '', Validators.compose([digitsOnly])],
            additionalChargesOption: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.additionalChargesOption : ''],
            additionalChargesTxn: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.additionalChargesTxn : '', Validators.compose([digitsOnly])],
            lastEntryLogDateOption: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.lastEntryLogDateOption : ''],
            lastEntryLogDate: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.lastEntryLogDate : ''],
            lastLoginDateOption: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.lastLoginDateOption : ''],
            lastLoginDate: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.lastLoginDate : ''],
        });
    }

    public closePopup() {
        this.hidePopup.emit();
    }
}
