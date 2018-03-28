import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

// UI
import HomeMain from 'home/Main';
import PanelMain from 'panel/Main';
import Footer from 'Footer';

// Component properties
interface ComponentProps {}

// Component state
interface ComponentState {}

class Main extends React.Component<ComponentProps, ComponentState> {
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

export default Main;
