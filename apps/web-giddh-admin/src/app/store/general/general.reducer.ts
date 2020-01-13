import { CurrentPage } from '../../modules/common';
import { CustomActions } from '../customActions';
import { GENERAL_ACTIONS } from '../../actions/general/general.const';

export interface GeneralState {

  headerTitle: { uniqueName: string, additional: { tab: string, tabIndex: number } };
  currentPage: CurrentPage;
}

const initialState: GeneralState = {
  headerTitle: null,
  currentPage: null
};

export function GeneRalReducer(state: GeneralState = initialState, action: CustomActions): GeneralState {
  switch (action.type) {
    case GENERAL_ACTIONS.SET_PAGE_HEADER_TITLE: {
      return {
        ...state, currentPage: action.payload
      }
    }

    default:
      return state;
  }
}