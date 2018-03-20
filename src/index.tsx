// Load polyfill for older browser support
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from 'Main';

ReactDOM.render(
  <Router >
    <Main />
  </Router >,
  document.getElementById('root') as HTMLElement
);
