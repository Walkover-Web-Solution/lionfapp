import { CustomActions } from '../customActions';
import { Subscription } from 'src/app/models/subscription';
import { AdminActions } from 'src/app/actions/admin.actions';
import { BaseResponse } from 'src/app/models/api-models/BaseResponse';
/**
* Keeping Track of the CompanyState
*/
export interface AdminState {
  subscription : any,
  isSubscriptionLoading : boolean
}

/**
* Setting the InitialState for this Reducer's Store
*/
const initialState: AdminState = {
  subscription : null,
  isSubscriptionLoading:false
};

export function AdminReducer(state: AdminState = initialState, action: CustomActions): AdminState {

  switch (action.type) {
    case 'CATCH_ERROR':
      // console.log(action.payload);
      return;
      case AdminActions.GET_SUBCRIPTION:
        return Object.assign({}, state, {
          isSubscriptionLoading: true
        });
      case AdminActions.GET_SUBCRIPTION_RESPONSE:
        let subscription: BaseResponse<any, string> = action.payload;
        if (subscription.status === 'success') {
          return Object.assign({}, state, {
            subscription: subscription.body,
            isSubscriptionLoading: false
          });
        }
        return Object.assign({}, state, {
          isSubscriptionLoading: false
        });
    default:
      return state;
  }
}
