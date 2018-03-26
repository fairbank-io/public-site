import { Dispatch } from 'react-redux';

// Available action types
enum ActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

// Base action object
interface Action {
  type: ActionType;
  data: object;
}

// All components that require dispatch actions to the state store should extend
// this interface on it's properties
interface ActionDispatcher {
  readonly dispatch: Dispatch<void>;
}

export {
  Action,
  ActionType,
  ActionDispatcher
};