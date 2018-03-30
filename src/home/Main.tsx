import * as React from 'react';
import * as redux from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';
import * as API from 'state/api';
import { ActionType, ActionDispatcher } from 'state/actions';
import { Session } from 'state/data';
import { ApplicationState } from 'state';

// UI
import Content from 'home/Content';
import SimpleModal from  'components/SimpleModal';
import RegisterForm from 'home/RegisterForm';
import LoginForm from 'home/LoginForm';

// Component properties
interface ComponentProps extends ActionDispatcher, RouteComponentProps<void> {
  session: Session | null;
}

// Component state
interface ComponentState {}

class HomeMain extends React.Component<ComponentProps, ComponentState> {
  client: API.Client;

  static stateToProps (state: ApplicationState): Partial<ComponentProps> {
    return {
      session: state.session
    };
  }

  constructor(props: ComponentProps) {
    super(props);
    this.client = new API.Client();
  }

  componentDidMount(): void {
    // With active session redirect user to panel
    if (this.props.session) {
      this.props.history.push('/panel');
    }
  }

  public render(): JSX.Element {
    return (
      <section>
        <Route
          path={'/home/register'}
          exact={true}
          render={() => (
            <SimpleModal title={'Registrar Nueva Cuenta'} onHide={() => this.props.history.push('/')}>
              <RegisterForm />
            </SimpleModal>
          )}
        />
        <Route
          path={'/home/login'}
          exact={true}
          render={() => (
            <SimpleModal title={'Iniciar Sesión'} onHide={() => this.props.history.push('/')}>
              <LoginForm
                onNewSession={(session) => {
                  // Set session
                  this.props.dispatch({
                    type: ActionType.LOGIN,
                    data: session
                  });

                  // Load account info
                  this.client.AccountInfo(session, (r, e) => {
                    if (e) {
                      // Handle error
                      return;
                    }

                    if (r && r.ok) {
                      this.props.dispatch({
                        type: ActionType.ACCOUNT_INFO,
                        data: r.data
                      });

                      // Load panel
                      this.props.history.push('/panel' + this.props.location.search);
                    }
                  });
                }}
              />
            </SimpleModal>
          )}
        />
        <Route component={Content} />
      </section>
    );
  }
}

export default redux.connect(HomeMain.stateToProps)(HomeMain);
