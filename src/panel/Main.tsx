import * as React from 'react';
import * as redux from 'react-redux';
import * as API from 'state/api';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ApplicationState } from 'state';
import { ActionType, ActionDispatcher } from 'state/actions';
import {
  AccountDetails,
  AccountInfo,
  Document,
  Notification,
  Referral,
  Session,
  Transaction
} from 'state/data';

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
  session: Session | null;
  accountInfo: AccountInfo | null;
}

// Component state
interface ComponentState {
  alert: string;
  alertLevel: string;
  showAlert: boolean;
  avatar: string;
}

class PanelMain extends React.Component<ComponentProps, ComponentState> {
  client: API.Client;

  static stateToProps (state: ApplicationState): Partial<ComponentProps> {
    return {
      session: state.session,
      accountInfo: state.account_info
    };
  }

  constructor(props: ComponentProps) {
    super(props);
    this.client = new API.Client();
    this.logout = this.logout.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onAlertClose = this.onAlertClose.bind(this);
    this.state = {
      alert: '',
      alertLevel: 'warning',
      showAlert: false,
      avatar: ''
    };
  }

  componentWillMount(): void {
    if (!this.props.session) {
      this.props.history.push('/home/login' + this.props.location.search);
      return;
    }
  }

  componentDidMount(): void {
    this.handleGetParams();
    this.loadAvatar();
  }

  componentDidUpdate(): void {
    this.handleGetParams();
  }

  public render(): JSX.Element {
    let info: AccountInfo = this.props.accountInfo || {} as AccountInfo;
    let session: Session = this.props.session || {} as Session;
    return (
      <section>
        <Header avatar={this.state.avatar} notificationsCounter={0} onLogoutRequest={this.logout} />
        <section className="content panel">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                { this.state.showAlert &&
                  <Alert type={this.state.alertLevel} onClose={this.onAlertClose}>{this.state.alert}</Alert>
                }
                <Switch>
                  <Route
                    path={this.props.match.url + '/invites'}
                    render={() => (
                      <Invites
                        invitesList={info.referrals || [] as Referral[]}
                        onNewInvite={(req: API.RequestNewInvite) => {
                          this.client.SendInvite(session, req, (r, e) => {
                            if (this.validateResult(r, e)) {
                              this.showAlert('success', 'La invitación ha sido enviada con éxito');
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
                        transactionsList={info.transactions || [] as Transactions[]}
                        onNewTx={(tx: Transaction) => {
                          this.client.NewTransaction(session, tx, (r, e) => {
                            if (this.validateResult(r, e)) {
                              this.showAlert('success', 'La transacción ha sido procesada con éxito');
                              this.loadAccountInfo();
                            }
                          });
                        }}
                      />
                    )}
                  />
                  <Route
                    path={this.props.match.url}
                    render={() => (
                      <GeneralDetails
                        details={info.details || {} as AccountDetails}
                        documents={info.documents}
                        onUpdateRequest={(d: AccountDetails) => {
                          this.client.AccountUpdate(session, d, (r, e) => {
                            if (this.validateResult(r, e)) {
                              this.showAlert('success', 'Tu información ha sido actualizada con exitosamente');
                              this.loadAccountInfo();
                            }
                          });
                        }}
                        onUploadRequest={this.uploadFile}
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
    if (!this.props.session) {
      return;
    }

    this.client.AccountInfo(this.props.session, (r, e) => {
      if (this.validateResult(r, e)) {
        if (r && r.ok) {
          this.props.dispatch({
            type: ActionType.ACCOUNT_INFO,
            data: r.data
          });
        }
      }
    });
  }

  private loadAvatar(): void {
    if (!this.props.accountInfo) {
      return;
    }

    // Use existing data
    let storedAvatar = window.sessionStorage.getItem('avatar');
    if (storedAvatar) {
      this.setState({
        avatar: storedAvatar
      });
      return;
    }

    // If no previous session data is present but a file is set, request it from the network
    this.props.accountInfo.documents.forEach((d) => {
      if (d.name === 'io.fairbank.avatar') {
        if (!this.props.session) {
          return;
        }
        this.client.GetFile(this.props.session, d, (r, e) => {
          if (e) {
            return;
          }
          if (r) {
            let doc = r.data as Document;
            window.sessionStorage.setItem('avatar', 'data:' + doc.mime + ';base64,' + doc.contents);
            this.setState({
              avatar: 'data:' + doc.mime + ';base64,' + doc.contents
            });
          }
        });
      }
    });
  }

  private logout(): void {
    if (!this.props.session) {
      return;
    }

    this.client.Logout(this.props.session, (r, e) => {
      if (this.validateResult(r, e)) {
        // Dispatch action
        this.props.dispatch({
          type: ActionType.LOGOUT,
          data: {}
        });

        // Go home
        this.props.history.push('/');
      }
    });
  }

  private validateResult(r: API.Response | null, error: string | null): boolean {
    // Failed requests
    if (error) {
      this.showAlert('danger', 'Error Interno: ' + error);
      return false;
    }

    // Bad results
    if (r && !r.ok) {
      this.showAlert('warning', r.desc);
      return false;
    }

    // All good!
    return ( r !== null && r.ok);
  }

  private onAlertClose(): void {
    this.setState({
      showAlert: false
    });
  }

  private showAlert(level: string, message: string) {
    this.setState({
      alert: message,
      alertLevel: level,
      showAlert: true
    });
  }

  private handleGetParams(): void {
    if (!this.props.session) {
      return;
    }

    if (!this.props.location.search) {
      return;
    }

    // Get params as an object
    let params: object = {};
    let urlParams: string = window.location.search.slice(1).split('#')[0];
    if (urlParams) {
      urlParams.split('&').map( (k: string) => {
        params[k.split('=')[0]] = k.split('=')[1];
      });
    }

    // Remove URL parameters
    window.history.replaceState({}, document.title, this.props.location.pathname);

    // Validate account
    if (params.hasOwnProperty('code') && params.hasOwnProperty('address')) {
      let req: API.RequestActivation = {
        source: 'email',
        data: params
      };

      this.client.AccountValidation(this.props.session, req, (r, e) => {
        if (this.validateResult(r, e)) {
          this.showAlert('success', 'Tu cuenta ha sido activada exitosamente');
        }
      });
    }
  }

  private uploadFile(name: string, f: File): void {
    if (!this.props.session) {
      return;
    }

    if (f.size / 1000 > 500 ) {
      this.showAlert('danger', 'El archivo seleccionado excede el tamaño máximo permitido de 500kb');
      return;
    }

    this.client.UploadFile(this.props.session, {name: name, contents: f}, (r, e) => {
      if (this.validateResult(r, e)) {
        if (r && r.ok) {
          this.showAlert('success', 'El archivo ha sido guardado exitosamente');
          if (name === 'io.fairbank.avatar') {
            this.loadAvatar();
          }
          this.loadAccountInfo();
        }
      }
    });
  }
}

export default redux.connect(PanelMain.stateToProps)(PanelMain);