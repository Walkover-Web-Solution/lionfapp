import { AdminActions } from '../../actions/admin.actions';
import { CustomActions } from '../customActions';


/**
 * Keeping Track of the AuthenticationState
 */
export interface SubscriptionsState {
  allSubscriptions: any;
}

/**
 * Setting the InitialState for this Reducer's Store
 */
const initialState = {
  allSubscriptions: null,
};

export function SubscriptionsReducer(state: SubscriptionsState = initialState, action: CustomActions): SubscriptionsState {

  switch (action.type) {
    case AdminActions.GET_SUBCRIPTION_RESPONSE:
      return Object.assign({}, state, {
        allSubscriptions: action.payload
      });
    default:
      return state;
  }
}
