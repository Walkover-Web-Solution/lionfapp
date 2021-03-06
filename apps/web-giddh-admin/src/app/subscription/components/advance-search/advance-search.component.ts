import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdvanceSearchRequestSubscriptions, CommonPaginatedRequest, PAGINATION_COUNT } from '../../../modules/modules/api-modules/subscription';
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
    selector: 'app-advance-search',
    templateUrl: './advance-search.component.html',
    styleUrls: ['./advance-search.component.scss']
})

export class AdvanceSearchComponent implements OnInit {
    public advanceSearchForm: FormGroup;
    @Input() public rightToggle: boolean = false;
    @Input() public searchedAdvancedRequestModelByAdvanceSearch: AdvanceSearchRequestSubscriptions = {
        signUpOnFrom: '',
        signUpOnTo: '',
        remainingTxn: '',
        expiryFilter: {
            from: '',
            to: ''
        },
        subscribeOn: {
            from: '',
            to: ''
        },
        remainingTxnOpn: ''
    };
    @Output() public hidePopup: EventEmitter<boolean> = new EventEmitter(true);
    @Output() public advanceSearchRequestEmitter: EventEmitter<AdvanceSearchRequestSubscriptions> = new EventEmitter();

    @ViewChild("remainingTxnOpn") public remainingTxnOpn: ShSelectComponent;

    public advanceSearchFilter: CommonPaginatedRequest = new CommonPaginatedRequest();
    public advanceSearchRequest: AdvanceSearchRequestSubscriptions = {
        signUpOnFrom: '',
        signUpOnTo: '',
        remainingTxn: '',
        expiryFilter: {
            from: '',
            to: ''
        },
        subscribeOn: {
            from: '',
            to: ''
        },
        remainingTxnOpn: ''
    };
    public remainingTransactionFilters: IOption[] = [{ label: 'Greater than', value: 'GREATER_THAN' }, { label: 'Less than', value: 'LESS_THAN' }, { label: 'Greater than equals to', value: 'GREATER_THAN_OR_EQUALS' }, { label: 'Less than equals to', value: 'LESS_THAN_OR_EQUALS' }];

    constructor(private fb: FormBuilder, private store: Store<AppState>, private adminActions: AdminActions, private toasty: ToasterService) { }

    ngOnInit() {
        this.remainingTxnOpn.show('');
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
        dataToSend.signUpOnFrom = dataToSend.signUpOnFrom ? moment(dataToSend.signUpOnFrom).format(GIDDH_DATE_FORMAT) : '';
        dataToSend.signUpOnTo = dataToSend.signUpOnTo ? moment(dataToSend.signUpOnTo).format(GIDDH_DATE_FORMAT) : '';

        this.advanceSearchRequestEmitter.emit(dataToSend);
        this.getAdvancedSearchedSubscriptions(dataToSend)
    }

    public getAdvancedSearchedSubscriptions(advanceSearchRequest) {
        this.store.dispatch(this.adminActions.getSubscriptionAdvancedSearch(advanceSearchRequest, this.advanceSearchFilter));
    }

    public setAdvanceSearch() {
        this.advanceSearchForm = this.fb.group({
            signUpOnFrom: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.signUpOnFrom : ''],
            signUpOnTo: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.signUpOnTo: ''],
            remainingTxn: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.remainingTxn : '', Validators.compose([digitsOnly])],
            expiryFilter: this.fb.group({
                from: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter) ? this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.from: ''],
                to: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter) ? this.searchedAdvancedRequestModelByAdvanceSearch.expiryFilter.to: '']
            }),
            subscribeOn: this.fb.group({
                from: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn) ? this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.from: ''],
                to: [(this.searchedAdvancedRequestModelByAdvanceSearch && this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn) ? this.searchedAdvancedRequestModelByAdvanceSearch.subscribeOn.to: '']
            }),
            remainingTxnOpn: [(this.searchedAdvancedRequestModelByAdvanceSearch) ? this.searchedAdvancedRequestModelByAdvanceSearch.remainingTxnOpn: '']
        });
    }

    public closePopup() {
        this.hidePopup.emit();
    }
}
