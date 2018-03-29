import * as React from 'react';
import * as redux from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ApplicationState } from 'state';
import { Action, ActionType, ActionDispatcher } from 'state/actions';
import { AccountDetails, AccountInfo, Referral, Notification, Session } from 'state/data';
import * as API from 'state/api';

// UI
import Alert from 'components/Alert';
import Header from 'panel/Header';
import GeneralDetails from 'panel/GeneralDetails';
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
      session: state.session,
      account_info: state.account_info
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

  componentWillMount(): void {
    // Load data if not available yet
    if (this.props.session && !this.props.account_info) {
      this.loadAccountInfo();
    }
  }

  public render(): JSX.Element | null {
    // Go home
    if (!this.props.session) {
      return ( <Redirect to={'/'} /> );
    }

    // Wait for data to render
    if (!this.props.account_info) {
      return null;
    }

    return (
      <section>
        <Header notificationsCounter={0} onLogoutRequest={this.logout} />
        <section className="content panel">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <Alert type={this.state.alertLevel}>{this.state.alert}</Alert>
                <Switch>
                  <Route
                    path={this.props.match.url + '/invites'}
                    render={() => (
                      <Invites
                        invitesList={this.props.account_info.referrals || [] as Referral[]}
                        onNewInvite={(req: API.RequestNewInvite) => {
                          this.client.SendInvite(this.props.session, req, (r, e) => {
                            if (this.handleResult(r, e)) {
                              this.setState({
                                alert: 'La invitación ha sido enviada con éxito',
                                alertLevel: 'success'
                              });
                              this.loadAccountInfo();
                            }
                          });
                        }}
                      />
                    )}
                  />
                  <Route
                    path={this.props.match.url + '/notifications'}
                    render={() => (
                      <Notifications messagesList={[] as Notification[]} />
                    )}
                  />
                  <Route
                    path={this.props.match.url + '/market'}
                    render={() => (
                      <MarketData />
                    )}
                  />
                  <Route
                    path={this.props.match.url + '/transactions'}
                    render={() => (
                      <Transactions
                        transactionsList={this.props.account_info.transactions || [] as Transactions[]}
                      />
                    )}
                  />
                  <Route
                    path={this.props.match.url}
                    render={() => (
                      <GeneralDetails
                        details={this.props.account_info.details || {} as AccountDetails}
                        onUpdateRequest={(d: AccountDetails) => {
                          this.client.AccountUpdate(this.props.session, d, (r, e) => {
                            if (this.handleResult(r, e)) {
                              this.setState({
                                alert: 'Tu información ha sido actualizada con exitosamente',
                                alertLevel: 'success'
                              });
                              this.loadAccountInfo();
                            }
                          });
                        }}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }

  private loadAccountInfo(): void {
    this.client.AccountInfo(this.props.session, (r, e) => {
      if (this.handleResult(r, e)) {
        if (r && r.ok) {
          let ac: Action = {
            type: ActionType.ACCOUNT_INFO,
            data: r.data
          };
          this.props.dispatch(ac);
        }
      }
    });
  }

  private logout(): void {
    this.client.Logout(this.props.session, (r, e) => {
      if (this.handleResult(r, e)) {
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

  private handleResult(r: API.Response | null, error: string | null): boolean {
    // Failed requests
    if (error) {
      this.setState({
        alert: 'Error Interno: ' + error,
        alertLevel: 'danger'
      });
      return false;
    }

    // Bad results
    if (r && !r.ok) {
      this.setState({
        alert: r.desc,
        alertLevel: 'warning'
      });
      return false;
    }

    // All good!
    if (r && r.ok) {
      return true;
    }

    return false;
  }
}

export default redux.connect(PanelMain.stateToProps)(PanelMain);