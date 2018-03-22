import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ApplicationState } from 'state';
import { ActionDispatcher } from 'state/actions';
import { Session } from 'state/data';

// UI
import HomeContent from 'home/Content';
import PanelMain from 'panel/Main';
import Footer from 'Footer';

// Component properties
interface ComponentProps extends ActionDispatcher {
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
        <Route path="/" exact={true} component={HomeContent} />
        <Route path="/panel" component={PanelMain} />
        <Footer />
      </section>
    );
  }
}

export default connect(Main.stateToProps)(Main);
