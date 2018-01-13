// Load polyfill for older browser support
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from 'Hello';

ReactDOM.render(
  <Hello message="coming soon" enthusiasmLevel={2} />,
  document.getElementById('root') as HTMLElement
);
