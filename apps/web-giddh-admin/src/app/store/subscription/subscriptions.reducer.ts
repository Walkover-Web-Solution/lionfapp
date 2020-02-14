import { AdminActions } from '../../actions/admin.actions';
import { CustomActions } from '../customActions';


/**
 * Keeping Track of the AuthenticationState
 */
export interface SubscriptionsState {
  allSubscriptions: any;
  isGetSubscriptionInprocess: boolean;
  isGetSubscriptionSuccess: boolean;
}

/**
 * Setting the InitialState for this Reducer's Store
 */
const initialState = {
  allSubscriptions: null,
  isGetSubscriptionInprocess: false,
  isGetSubscriptionSuccess: false
};

export function SubscriptionsReducer(state: SubscriptionsState = initialState, action: CustomActions): SubscriptionsState {

  switch (action.type) {

    case AdminActions.GET_SUBCRIPTION:
      return Object.assign({}, state, {
        isGetSubscriptionInprocess: true,
        isGetSubscriptionSuccess: false
      });
    case AdminActions.GET_SUBSCRIPTION_ADVANCEDSEARCH:
      return Object.assign({}, state, {
        isGetSubscriptionInprocess: true,
        isGetSubscriptionSuccess: false
      });
    case AdminActions.GET_SUBSCRIPTION_RESPONSE:
      {
        let allSubscriptions = action.payload;
        allSubscriptions.fromAdvanceSearch = false;
        return Object.assign({}, state, {
          allSubscriptions: allSubscriptions,
          isGetSubscriptionInprocess: false,
          isGetSubscriptionSuccess: true
        });
      }

    case AdminActions.GET_SUBSCRIPTION_AVANCEDSEARCH_RESPONSE:
      {
        let allSubscriptions = action.payload;
        allSubscriptions.fromAdvanceSearch = true;
        return Object.assign({}, state, {
          allSubscriptions: allSubscriptions,
          isGetSubscriptionInprocess: false,
          isGetSubscriptionSuccess: true
        });
      }
    default:
      return state;
  }
}
