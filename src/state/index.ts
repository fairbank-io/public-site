import { createStore } from 'redux';
import { AccountInfo, Session } from 'state/data';
import { Action, ActionType } from 'state/actions';

// Base application state definition
interface ApplicationState {
  session: Session;
  account_info: AccountInfo;
}

// Initial empty application state
const initialState: ApplicationState = <ApplicationState> {};

// Single state reducer
function reducer(state: ApplicationState, action: Action): ApplicationState {
  if (!state) {
    state = initialState;
  }

  let newState: ApplicationState = Object.assign(<ApplicationState> {}, state);

  switch (action.type) {
    case ActionType.LOGIN:
      newState.session = action.data as Session;
      break;
    case ActionType.LOGOUT:
      newState.session = {} as Session;
      break;
    default:
      return state;
  }
  return newState;
}
let store = createStore(reducer);

export {
  ApplicationState,
  store as ApplicationStore,
};