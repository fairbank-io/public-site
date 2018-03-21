import { createStore } from 'redux';
import { AccountInfo, Session } from 'state/data';
import { Action } from './actions';

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
  return Object.assign(<ApplicationState> {}, state);
}
let store = createStore(reducer);

export {
  ApplicationState,
  store as ApplicationStore,
};