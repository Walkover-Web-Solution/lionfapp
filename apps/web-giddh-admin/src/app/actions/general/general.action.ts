import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { GENERAL_ACTIONS } from './general.const';
import { CurrentPage } from '../../modules/common';

@Injectable()
export class GeneralActions {


  constructor(private action$: Actions) {

  }

  public setPageTitle(currentPageObj: CurrentPage) {
    return {
      type: GENERAL_ACTIONS.SET_PAGE_HEADER_TITLE,
      payload: { currentPageObj }
    }
  }

}