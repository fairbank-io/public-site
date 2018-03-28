import * as React from 'react';
import * as jQuery from 'jquery';
import * as CryptoJS from 'crypto-js';
import * as API from 'state/api';
import { Session } from 'state/data';

// UI
import Alert from 'components/Alert';

// Component properties
interface ComponentProps {
  onNewSession: (session: Session) => void;
}

// Component state
interface ComponentState {
  alert: string;
  alertLevel: string;
}

class LoginForm extends React.Component<ComponentProps, ComponentState> {
  form: HTMLFormElement | null;

  client: API.Client;

  commonErrors: object = {
    'INVALID_CREDENTIALS': 'Verifica tus credenciales y vuelve a intentarlo'
  };

  constructor(props: ComponentProps) {
    super(props);
    this.client = new API.Client();
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      alert: '',
      alertLevel: 'warning'
    };
  }

  public render(): JSX.Element {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p>Proporciona las credenciales de acceso de tu cuenta para iniciar una nueva sesión.</p>
            <Alert type={this.state.alertLevel}>{this.state.alert}</Alert>
            <form className="needs-validation" noValidate={true} ref={(el) => this.form = el}>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="icon">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required={true}
                    className="form-control form-control-lg"
                  />
                  <div className="invalid-feedback">Debes proporcionar una dirección valida.</div>
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="icon">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                  </div>
                  <input
                    type="password"
                    name="password"
                    minLength={8}
                    required={true}
                    className="form-control form-control-lg"
                  />
                  <div className="invalid-feedback">El campo es obligatorio con un mínimo de 8 caracteres.</div>
                </div>
                <small className="form-text text-muted">Nunca compartas tus credenciales de acceso con nadie.</small>
              </div>
              <div className="form-buttons">
                <button className="btn btn-lg submit" onClick={this.handleLogin}>Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private handleLogin(): void {
    if (!this.form) {
      return;
    }

    // Validate form
    if (!this.form.checkValidity()) {
      jQuery(this.form).addClass('was-validated');
      this.setState({
        alert: 'Los datos ingresados no son correctos',
        alertLevel: 'danger'
      });
      return;
    }

    // Run API request
    let req: API.RequestSession = this.getRequest();
    this.client.Login( req, (r, e) => {
      // Failed requests
      if (e) {
        this.setState({
          alert: 'Error Interno: ' + e,
          alertLevel: 'danger'
        });
        return;
      }

      // Bad results
      if (r && !r.ok) {
        this.setState({
          alert: this.commonErrors[r.desc] || r.desc,
          alertLevel: 'warning'
        });
        return;
      }

      // All good!
      if (r && r.ok) {
        this.props.onNewSession(r.data as Session);
      }
    });
  }

  private getRequest(): API.RequestSession {
    let req: API.RequestSession = {} as API.RequestSession;
    if (!this.form) {
      return req;
    }

    jQuery(this.form).serializeArray().forEach(function (k: JQuery.NameValuePair) {
      req[k.name] = k.value;
    });
    req.password = CryptoJS.SHA256(req.password).toString();
    return req;
  }
}

export default LoginForm;