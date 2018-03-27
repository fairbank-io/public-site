import { createStore } from 'redux';
import { AccountInfo, Session } from 'state/data';
import { Action, ActionType } from 'state/actions';

// Base application state definition
interface ApplicationState {
  session: Session;
  account_info: AccountInfo;
}

// Load initial application state
function getInitialState(): ApplicationState {
  let state: ApplicationState = {} as ApplicationState;
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
      newState = {} as ApplicationState;
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