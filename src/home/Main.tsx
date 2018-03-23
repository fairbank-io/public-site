import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ActionDispatcher } from 'state/actions';
import Content from 'home/Content';

// Component properties
interface ComponentProps extends ActionDispatcher {}

// Component state
interface ComponentState {}

class HomeMain extends React.Component<ComponentProps, ComponentState> {
  public render(): JSX.Element {
    return (
      <section>
        <Route
          path={'/home/register'}
          render={() => (
            <p>register</p>
          )}
        />
        <Route
          path={'/home/login'}
          render={() => (
            <p>login</p>
          )}
        />
        <Route component={Content} />
      </section>
    );
  }
}

export default connect()(HomeMain);
