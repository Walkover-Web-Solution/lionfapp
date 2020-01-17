import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdvanceSearchRequestSubscriptions, CommonPaginatedRequest } from '../../../modules/modules/api-modules/subscription';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { ToasterService } from '../../../services/toaster.service';
import * as moment from 'moment/moment';
import { GIDDH_DATE_FORMAT } from '../../../shared/defalutformatter/defaultDateFormat';
import { digitsOnly } from '../../../shared/helper/customValidationhelper';


@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {

  public advanceSearchForm: FormGroup;
  @Input() public rightToggle: boolean = false;
  @Output() public hidePopup: EventEmitter<boolean> = new EventEmitter(true);
  public advanceSearchFilter: CommonPaginatedRequest = new CommonPaginatedRequest();
  public advanceSearchRequest: AdvanceSearchRequestSubscriptions = {
    signUpOnFrom: '',
    signUpOnTo: '',
    startedAtFrom: '',
    balance: '',
    expiry: ''
    // startedAtTo: '', 
    // subscriptionId: '',
    // status: '',
    // planName: '',
    // userName: '',
    // email: '',
    // mobile: '',

  };
  public closePopup() {
    this.hidePopup.emit();
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>, private adminActions: AdminActions, private toasty: ToasterService) { }

  ngOnInit() {
    this.advanceSearchFilter.count = 50;
    this.advanceSearchFilter.page = 1;
    this.setAdvanceSearch();

  }
  public AdvanceSearch() {
    let dataToSend = _.cloneDeep(this.advanceSearchForm.value);
    dataToSend.startedAtFrom = dataToSend.startedAtFrom ? moment(dataToSend.startedAtFrom).format(GIDDH_DATE_FORMAT) : '';
    dataToSend.expiry = dataToSend.expiry ? moment(dataToSend.expiry).format(GIDDH_DATE_FORMAT) : '';
    dataToSend.signUpOnFrom = dataToSend.signUpOnFrom ? moment(dataToSend.signUpOnFrom).format(GIDDH_DATE_FORMAT) : '';
    dataToSend.signUpOnTo = dataToSend.signUpOnTo ? moment(dataToSend.signUpOnTo).format(GIDDH_DATE_FORMAT) : '';


    this.getAdvancedSearchedSubscriptions(dataToSend)
  }

  public getAdvancedSearchedSubscriptions(advanceSearchRequest) {
    this.store.dispatch(this.adminActions.getSubscriptionAdvancedSearch(advanceSearchRequest, this.advanceSearchFilter));
  }

  public setAdvanceSearch() {
    this.advanceSearchForm = this.fb.group({
      signUpOnFrom: [''],
      signUpOnTo: [''],
      startedAtFrom: [''],
      balance: ['', Validators.compose([digitsOnly])],
      expiry: ['']
      // startedAtTo: [''],
      // subscriptionId: [''],
      // status: [''],
      // planName: [''],
      // userName: [''],
      // email: [''],
      // mobile: [''],
    });
  }

}
