import * as React from 'react';
import * as redux from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { Action, ActionType, ActionDispatcher } from 'state/actions';
import { Session } from 'state/data';
import { ApplicationState } from 'state';

// UI
import Content from 'home/Content';
import SimpleModal from  'components/SimpleModal';
import RegisterForm from 'home/RegisterForm';
import LoginForm from 'home/LoginForm';

// Component properties
interface ComponentProps extends ActionDispatcher, RouteComponentProps<void> {
  session: Session;
}

// Component state
interface ComponentState {}

class HomeMain extends React.Component<ComponentProps, ComponentState> {
  static stateToProps (state: ApplicationState): Partial<ComponentProps> {
    return {
      session: state.session
    };
  }

  public render(): JSX.Element {
    // Go to the user panel
    if (this.props.session) {
      return ( <Redirect to={'/panel'} /> );
    }

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
                onNewSession={(s) => {
                  // Dispatch action
                  let ac: Action = {
                    type: ActionType.LOGIN,
                    data: s
                  };
                  this.props.dispatch(ac);

                  // Load panel
                  this.props.history.push('/panel');
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
