import * as React from 'react';

class HomeContent extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <section className="content home">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="desc">
                <a href="#" className="logo" />
                <h1 className="d-md-block">Servicios financieros digitales sin demoras, sin límites... justos!</h1>
                <p>En la comunidad FairBank creamos un sistema justo y transparente. Con la tecnología más avanzada,
                  proveemos una amplia gama servicios financieros digitales para la vida actual, incluyendo una
                  conexión segura al mundo de las criptodivisas, sin demoras ni cuotas ocultas.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 offset-md-2">
              <button className="btn register">
                <span>Crear Cuenta</span>
                <span className="icon">
                    <i className="fas fa-address-card" />
                  </span>
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn login">
                <span>Iniciar Sesión</span>
                <span className="icon">
                    <i className="fas fa-lock" />
                  </span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="phone">
                <div className="sample-card" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// Module exports
export default HomeContent;