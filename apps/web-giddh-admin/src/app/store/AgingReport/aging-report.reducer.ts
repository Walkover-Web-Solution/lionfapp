import { BaseResponse } from '../../models/api-models/BaseResponse';
import * as _ from '../../lodash-optimized';
import { CustomActions } from '../customActions';
import { AgingDropDownoptions, DueAmountReportRequest, DueAmountReportResponse, DueRangeRequest } from '../../models/api-models/Contact';
import { AgingReportActions } from '../../actions/aging-report.actions';

export interface AgingReportState {
  setDueRangeRequestInFlight: boolean;
  setDueRangeOpen: boolean;
  noData: boolean;
}

export const initialState: AgingReportState = {
  setDueRangeRequestInFlight: false,
  setDueRangeOpen: false,
  noData: true
};

export function agingReportReducer(state = initialState, action: CustomActions): AgingReportState {
  // let data: BaseResponse<LogsResponse, LogsRequest> = null;
  let newState: AgingReportState = null;
  switch (action.type) {
    case AgingReportActions.CREATE_DUE_DAY_RANGE: {
      return Object.assign({}, state, {setDueRangeRequestInFlight: true});
    }
    case AgingReportActions.DUE_DAY_RANGE_POPUP_OPEN: {
      return Object.assign({}, state, {setDueRangeOpen: true});
    }
    case AgingReportActions.DUE_DAY_RANGE_POPUP_CLOSE: {
      return Object.assign({}, state, {setDueRangeOpen: false});
    }
    default: {
      return state;
    }
  }
}
