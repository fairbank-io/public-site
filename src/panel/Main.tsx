import * as React from 'react';
import Header from 'panel/Header';

class PanelMain extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <section>
        <Header />

        <section className="content panel">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <h1>Mi Cuenta</h1>
                <p>...</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

// Module exports
export default PanelMain;