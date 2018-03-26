import * as React from 'react';
import * as redux from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ApplicationState } from 'state';
import { Session } from 'state/data';

// UI
import HomeMain from 'home/Main';
import PanelMain from 'panel/Main';
import Footer from 'Footer';

// Component properties
interface ComponentProps {
  session: Session;
}

// Component state
interface ComponentState {}

class Main extends React.Component<ComponentProps, ComponentState> {
  static stateToProps (state: ApplicationState): Partial<ComponentProps> {
    return {
      session: state.session
    };
  }

  constructor(props: ComponentProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <section>
        <Switch>
          <Route path="/panel" component={PanelMain} />
          <Route component={HomeMain} />
        </Switch>
        <Footer />
      </section>
    );
  }
}

export default redux.connect(Main.stateToProps)(Main);
