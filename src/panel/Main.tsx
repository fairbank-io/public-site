import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

// UI
import Header from 'panel/Header';
import AccountDetails from 'panel/AccountDetails';
import Invites from 'panel/Invites';
import Notifications from 'panel/Notifications';
import MarketData from 'panel/MarketData';
import Transactions from 'panel/Transactions';

interface Props extends RouteComponentProps<void> {}

class PanelMain extends React.Component<Props, {}> {
  public render(): JSX.Element {
    return (
      <section>
        <Header />
        <section className="content panel">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <Route path={this.props.match.url}  exact={true} component={AccountDetails} />
                <Route path={this.props.match.url + '/invites'} component={Invites} />
                <Route path={this.props.match.url + '/notifications'} component={Notifications} />
                <Route path={this.props.match.url + '/market'} component={MarketData} />
                <Route path={this.props.match.url + '/transactions'} component={Transactions} />
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

// Module exports
export default PanelMain;