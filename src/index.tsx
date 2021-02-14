// Load polyfill for older browser support
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';

// Base application styles
import 'assets/js/fontawesome-5.0.6.js';
import 'assets/css/main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApplicationStore } from 'state';
import Main from 'Main';

ReactDOM.render(
  // @ts-ignore
  <Provider store={ApplicationStore}>
    <Router forceRefresh={!('pushState' in window.history)}>
      <Route component={Main} />
    </Router>
  </Provider>,
  document.getElementById('main-wrapper') as HTMLElement
);
