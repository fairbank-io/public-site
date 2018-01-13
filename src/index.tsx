// Load polyfill for older browser support
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Initial state
import { createStore } from 'redux';
import { enthusiasm } from 'state/reducer';
import { StoreState } from 'state/index';
const store = createStore<StoreState>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});

import Hello from './containers/Hello';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
