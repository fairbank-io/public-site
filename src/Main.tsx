import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import Wrapper from './Wrapper';

class Main extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="content">
        <ul>
          <li>
            <Link to="fair">FAIR</Link>
          </li>
          <li>
            <Link to="btc">BTC</Link>
          </li>
          <li>
            <Link to="ltc">LTC</Link>
          </li>
        </ul>
        <Route path="*" component={Wrapper} />
      </div>
    );
  }
}

// Module exports
export default Main;