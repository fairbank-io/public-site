import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './Hello';

ReactDOM.render(
  <Hello name="FairBank" enthusiasmLevel={2} />,
  document.getElementById('root') as HTMLElement
);
