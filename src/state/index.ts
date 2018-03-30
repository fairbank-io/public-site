import { createStore } from 'redux';
import { AccountInfo, Session } from 'state/data';
import { Action, ActionType } from 'state/actions';

// Base application state definition
interface ApplicationState {
  session: Session | null;
  account_info: AccountInfo | null;
}

// Default empty state
const emptyState: ApplicationState = {
  session: null,
  account_info: null
};

// Load initial application state
function getInitialState(): ApplicationState {
  let state: ApplicationState = emptyState;
  let storedState: string | null = window.sessionStorage.getItem('application_state');
  if (storedState) {
    state = JSON.parse(storedState);
  }
  return state;
}

// Single state reducer
function reducer(state: ApplicationState, action: Action): ApplicationState {
  if (!state) {
    state = getInitialState();
  }
  let newState: ApplicationState = Object.assign(<ApplicationState> {}, state);

  switch (action.type) {
    case ActionType.LOGIN:
      newState.session = action.data as Session;
      break;
    case ActionType.LOGOUT:
      newState = emptyState;
      break;
    case ActionType.ACCOUNT_INFO:
      newState.account_info = action.data as AccountInfo;
      break;
    default:
      return state;
  }
  window.sessionStorage.setItem('application_state', JSON.stringify(newState));
  return newState;
}
let store = createStore(reducer, getInitialState());

export {
  ApplicationState,
  store as ApplicationStore,
};