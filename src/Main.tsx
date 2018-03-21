import * as React from 'react';
// import PanelMain from 'panel/Main';
import HomeContent from 'home/Content';
import Footer from 'Footer';

class Main extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <section>
        <HomeContent />
        <Footer />
      </section>
    );
  }
}

// Module exports
export default Main;