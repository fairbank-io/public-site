import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import Header from 'panel/Header';
import AccountDetails from 'panel/AccountDetails';
import Invites from 'panel/Invites';
import Notifications from 'panel/Notifications';
import MarketData from 'panel/MarketData';
import Transactions from 'panel/Transactions';

// Component properties
interface ComponentProps extends RouteComponentProps<void> {}

// Component state
interface ComponentState {}

class PanelMain extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  public render(): JSX.Element {
    return (
      <section>
        <Header notificationsCounter={0} onLogoutRequest={this.logout} />
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

  private logout(): void {
    // Handle logout request
  }
}

export default PanelMain;