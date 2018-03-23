import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

// State
import { ApplicationState } from 'state';
import { ActionDispatcher } from 'state/actions';
import { AccountInfo, Session } from 'state/data';

// UI
import Header from 'panel/Header';
import AccountDetails from 'panel/AccountDetails';
import Invites from 'panel/Invites';
import Notifications from 'panel/Notifications';
import MarketData from 'panel/MarketData';
import Transactions from 'panel/Transactions';

// Component properties
interface ComponentProps extends ActionDispatcher, RouteComponentProps<void> {
  session: Session;
  account_info: AccountInfo;
}

// Component state
interface ComponentState {}

class PanelMain extends React.Component<ComponentProps, ComponentState> {
  static stateToProps (state: ApplicationState): Partial<ComponentProps> {
    return {
      session: state.session
    };
  }

  constructor(props: ComponentProps) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  public render(): JSX.Element {
    if (!this.props.session) {
      // Go home
      // return ( <Redirect to={'/'} /> );
    }

    return (
      <section>
        <Header notificationsCounter={0} onLogoutRequest={this.logout} />
        <section className="content panel">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <Switch>
                  <Route path={this.props.match.url + '/invites'} component={Invites} />
                  <Route path={this.props.match.url + '/notifications'} component={Notifications} />
                  <Route path={this.props.match.url + '/market'} component={MarketData} />
                  <Route path={this.props.match.url + '/transactions'} component={Transactions} />
                  <Route path={this.props.match.url} component={AccountDetails} />
                </Switch>
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

export default connect(PanelMain.stateToProps)(PanelMain);