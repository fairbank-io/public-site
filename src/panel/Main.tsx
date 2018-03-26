import * as React from 'react';
import * as redux from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ApplicationState } from 'state';
import { Action, ActionType, ActionDispatcher } from 'state/actions';
import { AccountInfo, Session } from 'state/data';
import * as API from 'state/api';

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
interface ComponentState {
  alert: string;
  alertLevel: string;
}

class PanelMain extends React.Component<ComponentProps, ComponentState> {
  client: API.Client;

  static stateToProps (state: ApplicationState): Partial<ComponentProps> {
    return {
      session: state.session
    };
  }

  constructor(props: ComponentProps) {
    super(props);
    this.client = new API.Client();
    this.logout = this.logout.bind(this);
    this.state = {
      alert: '',
      alertLevel: 'warning'
    };
  }

  public render(): JSX.Element {
    // Go home
    if (!this.props.session) {
      return ( <Redirect to={'/'} /> );
    }

    // Build alert message
    let alert: JSX.Element | null = null;
    if (this.state.alert) {
      let alertType: string = 'alert alert-' + this.state.alertLevel;
      alert = <div className={alertType}>{this.state.alert}</div>;
    }

    return (
      <section>
        <Header notificationsCounter={0} onLogoutRequest={this.logout} />
        <section className="content panel">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                {alert}
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
    this.client.Logout(this.props.session, (r, e) => {
      // Failed requests
      if (e) {
        this.setState({
          alert: 'Error Interno: ' + e,
          alertLevel: 'danger'
        });
        return;
      }

      // Bad results
      if (r && !r.ok) {
        this.setState({
          alert: r.desc,
          alertLevel: 'warning'
        });
        return;
      }

      // All good!
      if (r && r.ok) {
        // Dispatch action
        let ac: Action = {
          type: ActionType.LOGOUT,
          data: {}
        };
        this.props.dispatch(ac);

        // Go home
        this.props.history.push('/');
      }
    });
  }
}

export default redux.connect(PanelMain.stateToProps)(PanelMain);